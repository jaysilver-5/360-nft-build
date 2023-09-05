import { NextResponse } from "next/server";
import { headers } from "next/headers";

import Stripe from "stripe";
import { stripe } from "@/utils/stripe";

import {
  insertProductRecord,
  insertPriceRecord,
  handleProductSold,
} from "@/utils/supabaseAdmin";
import { ProductMetadata } from "@/types";

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.async_payment_succeeded",
  "checkout.session.completed",
  "checkout.session.expired",
  "charge.pending",
  "charge.succeeded",
  "charge.failed",
]);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature") as string;

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;

    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.log(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
          await insertProductRecord(event.data.object as Stripe.Product);
          break;
        case "price.created":
          await insertPriceRecord(event.data.object as Stripe.Price);
          break;
        case "checkout.session.async_payment_succeeded":
        case "checkout.session.completed":
          await handleProductSold(
            // @ts-ignore
            event.data.object.metadata as ProductMetadata
          );
          break;
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 }
      );
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
}

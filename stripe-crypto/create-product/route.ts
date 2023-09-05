import { stripe } from "@/utils/stripe";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, price, description, art_submission_id, images } =
      await request.json();

    // Create a new product
    const stripeProduct = await stripe.products.create({
      name: name,
      description: description,
      images: images,
      metadata: {
        art_submission_id,
      },
    });

    // Create a new price for the product
    const stripePrice = await stripe.prices.create({
      product: stripeProduct.id,
      unit_amount: price * 100,
      currency: "usd",
      metadata: {
        art_submission_id,
      },
    });

    return NextResponse.json({ stripeProduct, stripePrice });
  } catch (error) {
    return NextResponse.error();
  }
}

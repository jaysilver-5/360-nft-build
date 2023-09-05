import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/utils/supabaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { data, error } = await supabaseAdmin
      .from("360nftV0_contact-form")
      .upsert([
        {
          name: body.name,
          subject: body.subject,
          message: body.message,
          email: body.email,
        },
      ])
      .select();

    if (data) {
      return NextResponse.json({
        data,
        status: 201,
      });
    } else {
      return NextResponse.json("Failed");
    }
  } catch (error) {
    console.log(error);
  }
}

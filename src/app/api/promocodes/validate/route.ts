import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { promocode } = await request.json();
    const code = await Promocodes.findOne({ code: promocode });

    if (!code) {
      return NextResponse.json({
        message: "Invalid promocode!",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Promocode is valid!",
      status: 200,
      code,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

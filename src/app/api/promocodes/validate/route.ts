import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const code = await Promocodes.findOne({ code: body.promocode });

    if (!code) {
      return NextResponse.json({
        message: "Invalid promocode!",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Promocode is valid!",
      status: 200,
      percent: code.percent,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

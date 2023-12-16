import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const code = await Promocodes.findOne({ code: body.code });

    if (code) {
      return NextResponse.json({
        message: "Promocode already exists!",
        status: 403,
      });
    }

    const newCode = new Promocodes({
      code: body.code,
      createdAt: Date.now(),
    });

    await newCode.save();

    return NextResponse.json({
      message: "Promocode created successfully!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

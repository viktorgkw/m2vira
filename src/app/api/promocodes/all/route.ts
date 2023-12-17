import { NextRequest, NextResponse } from "next/server";
import Promocodes from "@/models/promocodeModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const codes = await Promocodes.find();

    return NextResponse.json({
      message: "All promocodes retrieved.",
      status: 200,
      codes,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
      codes: [],
    });
  }
}

export const dynamic = "force-dynamic";

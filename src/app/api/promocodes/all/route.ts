import { NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function GET() {
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

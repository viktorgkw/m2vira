import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function GET(request: NextRequest) {
  try {
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    await connect();

    const date = new Date();
    date.setDate(date.getDate() - 7);

    await Promocodes.deleteMany({ createdAt: { $lt: date } });

    return NextResponse.json({
      message: "(Monthly promocodes cleanup) Cron executed successfully!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
    });
  }
}

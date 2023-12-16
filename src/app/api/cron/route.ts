import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function GET(request: NextRequest) {
  try {
    if (
      request.headers.get("Authorization") !==
      `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({
        message: "Unauthorized",
        status: 500,
      });
    }

    await connect();

    const promocodes = await Promocodes.find();

    for (const pc of promocodes) {
      if (Date.now() > pc.createdAt) {
        await Promocodes.deleteOne({ code: pc.code });
      }
    }

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

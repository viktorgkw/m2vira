import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const user = await User.findOne({ email: decoded.email });

    let orders = [];

    if (user) {
      orders = user.orders;
    }

    return NextResponse.json({
      message: "Orders retrieved!",
      status: 200,
      orders: orders,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500, orders: [] });
  }
}

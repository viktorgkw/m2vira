import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const { email } = await request.json();
    const user = await User.findOne({ email });

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

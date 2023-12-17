import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const user = await User.findOne({ email: decoded.email });

    const orders = user.cart.map((p: any) => ({
      title: p.title,
      price: p.price,
      size: p.size,
      color: p.color,
    }));

    user.orders.push(...orders);
    user.cart = [];
    await user.save();

    return NextResponse.json({
      message: "Your order was successful!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

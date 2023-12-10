import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { userEmail } = await req.json();
    const user = await User.findOne({ email: userEmail });

    if (user.cart.length === 0) {
      return NextResponse.json({
        message: "No products in cart!",
        status: 404,
      });
    }

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

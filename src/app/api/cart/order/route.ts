import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { data, userEmail } = await req.json();
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      throw new Error("Unauthorized!");
    }

    if (user.cart.length === 0) {
      throw new Error("No products in your cart!");
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

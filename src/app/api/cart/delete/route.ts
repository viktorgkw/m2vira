import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const body = await request.json();
    const { id } = body;

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      throw new Error("Unauthorized!");
    }

    user.cart = user.cart.filter((p: any) => p.id !== id);
    await user.save();

    return NextResponse.json({
      message: "Product removed from cart!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

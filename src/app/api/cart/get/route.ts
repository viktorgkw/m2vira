import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const user = await User.findOne({ email: decoded.email });

    let cart = [];

    if (user && user.cart.length !== 0) {
      cart = user.cart.filter((p: any) => !p.isOrdered);
    }

    return NextResponse.json({
      message: "Cart retrieved!",
      status: 200,
      cart,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500, cart: [] });
  }
}

export const dynamic = "force-dynamic";

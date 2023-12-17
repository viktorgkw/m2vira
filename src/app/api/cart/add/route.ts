import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Product from "@/models/productModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const body = await request.json();
    const { productState } = body;

    const product = await Product.findOne({ _id: productState.id });
    const user = await User.findOne({ email: decoded.email });

    if (!product || !user) {
      throw new Error("Invalid request!");
    }

    if (
      user.cart.some(
        (item: any) =>
          item.id === productState.id &&
          item.color === productState.color &&
          item.size === productState.size
      )
    ) {
      throw new Error("Product is already in your cart!");
    }

    user.cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      color: productState.color,
      size: productState.size,
      isOrdered: false,
      image: productState.image,
    });

    await user.save();

    return NextResponse.json({
      message: "Product added to cart!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

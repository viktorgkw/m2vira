import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/dbConfig/dbConfig";
import Favorites from "@/models/favoritesModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { _id } = body;

    const product = await Product.findOne({ _id: _id });

    if (!product) {
      return NextResponse.json({
        message: "Product was not found!",
        status: 404,
      });
    }

    await Favorites.deleteMany({ productId: _id });
    await Product.deleteOne({ _id: _id });

    return NextResponse.json({
      message: "Product deleted successfully!",
      status: 200,
      product,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

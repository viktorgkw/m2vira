import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/helpers/mongoDB";
import Favorites from "@/models/favoritesModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { _id } = body;

    if (!(await Product.findOne({ _id: _id }))) {
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
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

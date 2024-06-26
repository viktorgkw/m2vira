import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Product from "@/models/productModel";
import Favorites from "@/models/favoritesModel";
import { connect } from "@/helpers/mongoDB";

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

    await User.updateMany({ "cart.id": _id }, { $pull: { cart: { id: _id } } });

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

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Product from "@/models/productModel";
import Favorites from "@/models/favoritesModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    const user = await User.findOne({ email: decoded.email });

    const favs = await Favorites.find({
      userId: user._id,
    });

    const products: any[] = [];

    if (favs.length !== 0) {
      await Promise.all(
        favs.map(async (f) => {
          products.push(await Product.findOne({ _id: f.productId }));
        })
      );
    }

    return NextResponse.json({
      message: "Favorites retrieved successfully!",
      status: 200,
      products,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
      products: [],
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/productModel";
import { connect } from "@/helpers/mongoDB";
import { addImage } from "@/helpers/storage";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const formData = await request.formData();

    const { title, description, price, materials, sizes, colors, tags } =
      JSON.parse(formData.get("product") as string);

    const product = await Product.findOne({ title });

    if (product) {
      return NextResponse.json({
        message: "Product with this title already exists!",
        status: 403,
      });
    }

    await addImage(title, formData.get("file") as File);

    const splittedMaterials: string[] = materials.split(",");
    const splittedSizes: string[] = sizes.split(",");
    const splittedColors: string[] = colors.split(",");
    const splittedTags: string[] = tags.split(",");

    const newProduct = new Product({
      title: title.trim(),
      description: description.trim(),
      price,
      materials: splittedMaterials,
      sizes: splittedSizes,
      colors: splittedColors,
      tags: splittedTags,
      createdAt: Date.now(),
    });

    const productResult = await newProduct.save();

    return NextResponse.json({
      message: "Product created successfully!",
      status: 200,
      product: productResult,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

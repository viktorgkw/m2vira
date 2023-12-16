import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Promocodes from "@/models/promocodeModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { _id } = body;

    if (!(await Promocodes.findOne({ _id: _id }))) {
      return NextResponse.json({
        message: "Promocode was not found!",
        status: 404,
      });
    }

    await Promocodes.deleteOne({ _id: _id });

    return NextResponse.json({
      message: "Promocode deleted successfully!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

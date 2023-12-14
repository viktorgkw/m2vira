import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const { _id } = body;

    if (!(await User.findOne({ _id: _id }))) {
      return NextResponse.json({
        message: "User was not found!",
        status: 404,
      });
    }

    await User.deleteOne({ _id: _id });

    return NextResponse.json({
      message: "User deleted successfully!",
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

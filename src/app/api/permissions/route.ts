import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({
        status: 404,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
      });
    }

    return NextResponse.json({
      status: 200,
      isAdmin: user.isAdmin,
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

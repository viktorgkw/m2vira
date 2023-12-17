import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/helpers/mongoDB";
import { decodeCookie } from "@/helpers/cookieDecoder";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const decoded = await decodeCookie(request);

    if (decoded === null) {
      return NextResponse.json({ message: "Unauthorized", status: 401 });
    }

    const user = await User.findOne({ email: decoded.email });

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

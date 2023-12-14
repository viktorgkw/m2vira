import { NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import User from "@/models/userModel";

export async function GET() {
  try {
    await connect();

    const users = await User.find();

    return NextResponse.json({
      message: "All users retrieved.",
      status: 200,
      users,
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
      status: 500,
      users: [],
    });
  }
}

export const dynamic = "force-dynamic";

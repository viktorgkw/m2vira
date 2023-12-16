import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Newsletter from "@/models/newsletterModel";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { email } = await req.json();
    const user = await Newsletter.findOne({ userEmail: email });

    if (user) {
      return NextResponse.json({
        status: 400,
        message: "Already subscribed!",
      });
    }

    const newUser = new Newsletter({
      userEmail: email,
    });

    await newUser.save();

    return NextResponse.json({
      status: 200,
      message: "Signed up successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

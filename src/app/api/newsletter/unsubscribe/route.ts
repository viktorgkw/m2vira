import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/helpers/mongoDB";
import Newsletter from "@/models/newsletterModel";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const { email } = await req.json();
    const user = await Newsletter.findOne({ userEmail: email });

    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "You are not subscribed!",
      });
    }

    await Newsletter.deleteOne({ userEmail: email });

    return NextResponse.json({
      status: 200,
      message: "Unsubcribed successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({ message: err.message, status: 500 });
  }
}

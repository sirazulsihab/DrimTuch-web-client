import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Affiliate from "@/models/Affiliate";

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  const affiliate = await Affiliate.findOne({ user: id });
  if (!affiliate) {
    return NextResponse.json({ error: "Affiliate not found" }, { status: 404 });
  }

  return NextResponse.json(affiliate);
}

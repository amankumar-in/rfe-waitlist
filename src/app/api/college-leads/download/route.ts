import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";

const PDF_PATH = path.join(
  process.cwd(),
  "private-assets",
  "college-partnership-offer.pdf"
);

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get("token");

    if (!token || token.length < 16) {
      return new NextResponse("Invalid download link.", { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    const collection = db.collection("college_leads");

    const lead = await collection.findOneAndUpdate(
      { downloadToken: token },
      {
        $inc: { downloadCount: 1 },
        $set: { lastDownloadedAt: new Date() },
      }
    );

    if (!lead) {
      return new NextResponse(
        "This download link is no longer valid. Please request the offer again.",
        { status: 404 }
      );
    }

    const file = await fs.readFile(PDF_PATH);

    return new NextResponse(new Uint8Array(file), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="CFC-College-Partnership-Offer.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[college-leads/download] error:", error);
    return new NextResponse("Server error.", { status: 500 });
  }
}

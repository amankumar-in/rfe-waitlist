import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    
    // Get visitor identifier from request (could be IP, session ID, etc.)
    // For now, we'll use a simple approach: track unique visitors by IP + User-Agent
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip") || "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";
    
    // Create a unique visitor ID based on IP and User-Agent hash
    // In production, you might want to use cookies or a more sophisticated tracking method
    const visitorId = Buffer.from(`${ip}-${userAgent}`).toString("base64").slice(0, 32);
    
    // Check if this visitor was already counted today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingVisit = await db.collection("visitors").findOne({
      visitorId,
      date: {
        $gte: today,
      },
    });
    
    // If this is a new visitor today, add them
    if (!existingVisit) {
      await db.collection("visitors").insertOne({
        visitorId,
        ip,
        userAgent,
        date: new Date(),
        createdAt: new Date(),
      });
    }
    
    // Get total unique visitors count
    const totalVisitors = await db.collection("visitors").countDocuments();
    
    return NextResponse.json({ 
      success: true,
      totalVisitors,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    return NextResponse.json({ 
      success: false,
      totalVisitors: 0,
    }, { status: 500 });
  }
}



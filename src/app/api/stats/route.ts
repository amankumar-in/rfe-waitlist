import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    
    const totalUsers = await db.collection("users").countDocuments();
    
    // Get total unique visitors count
    const totalVisitors = await db.collection("visitors").countDocuments();
    
    // Get hurdle statistics
    const hurdleStats = await db.collection("users").aggregate([
      { $unwind: "$hurdles" },
      { $group: { _id: "$hurdles", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]).toArray();

    return NextResponse.json({ 
      totalUsers,
      totalVisitors,
      hurdleStats: hurdleStats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {} as Record<string, number>)
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json({ totalUsers: 0, totalVisitors: 0, hurdleStats: {} });
  }
}



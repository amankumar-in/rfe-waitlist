import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({ exists: true, user });
  } catch (error) {
    console.error("Error checking user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json();

    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    
    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email: userData.email });
    
    if (existingUser) {
      // Remove _id from userData to prevent immutable field error
      const { _id, ...updateData } = userData;
      
      // Update existing user
      const result = await db.collection("users").updateOne(
        { email: userData.email },
        { 
          $set: { 
            ...updateData,
            updatedAt: new Date()
          } 
        }
      );
      return NextResponse.json({ success: true, user: { ...existingUser, ...userData }, updated: true });
    }

    // Create new user
    const newUser = {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);
    return NextResponse.json({ success: true, user: { ...newUser, _id: result.insertedId } });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



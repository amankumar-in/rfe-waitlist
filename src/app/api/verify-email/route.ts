import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/zeptomail";
import clientPromise from "@/lib/mongodb";

// In-memory store for OTPs (Note: Resets on server restart/lambda cold start)
// In production, use Redis or Database
const otpStore = new Map<string, { otp: string; formData: any }>();

export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const { email, name, firstName, lastName, country } = await request.json();
    
    console.log(`[verify-email] Starting verification for: ${email}`);
    
    // Get MongoDB client with timeout
    console.log(`[verify-email] Getting MongoDB client...`);
    const clientStartTime = Date.now();
    let client;
    try {
      client = await Promise.race([
        clientPromise,
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error("MongoDB connection timeout after 10 seconds")), 10000)
        )
      ]);
      console.log(`[verify-email] MongoDB client ready in ${Date.now() - clientStartTime}ms`);
    } catch (error) {
      console.error(`[verify-email] MongoDB connection failed after ${Date.now() - clientStartTime}ms:`, error);
      throw new Error(`Database connection failed: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    const db = client.db("rfe_waitlist");
    
    console.log(`[verify-email] Checking existing user...`);
    const queryStartTime = Date.now();
    let existingUser;
    try {
      existingUser = await Promise.race([
        db.collection("users").findOne({ email }),
        new Promise<null>((_, reject) => 
          setTimeout(() => reject(new Error("Database query timeout after 10 seconds")), 10000)
        )
      ]);
      console.log(`[verify-email] User check completed in ${Date.now() - queryStartTime}ms (total: ${Date.now() - startTime}ms)`);
    } catch (error) {
      console.error(`[verify-email] Database query failed after ${Date.now() - queryStartTime}ms:`, error);
      throw new Error(`Database query failed: ${error instanceof Error ? error.message : String(error)}`);
    }
    
    if (existingUser) {
      // User exists, send OTP but don't create new account
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, { otp, formData: existingUser });
      
      // Send email
      console.log(`[verify-email] Sending email to existing user...`);
      const emailStartTime = Date.now();
      const emailResult = await sendEmail(
        email, 
        name || firstName || "User", 
        "Your Verification Code - Rewards For Education",
        `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #635BFF;">Welcome back to Rewards For Education</h1>
          <p style="font-size: 16px; color: #333;">Hello ${name || firstName || 'there'},</p>
          <p style="font-size: 16px; color: #333;">Your verification code is:</p>
          <div style="background: #f6f9fc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <h2 style="color: #635BFF; font-size: 32px; letter-spacing: 4px; margin: 0;">${otp}</h2>
          </div>
          <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
        </div>`
      );
      console.log(`[verify-email] Email send completed in ${Date.now() - emailStartTime}ms`);

      if (!emailResult.success) {
        const isDevelopment = process.env.NODE_ENV === 'development';
        if (isDevelopment) {
          return NextResponse.json({ 
            success: true, 
            otp: otp,
            emailSent: false,
            existingUser: true
          });
        }
      }

      console.log(`[verify-email] Total time: ${Date.now() - startTime}ms`);
      return NextResponse.json({ success: true, message: "OTP sent", emailSent: true, existingUser: true });
    }
    
    // New user - Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with form data
    otpStore.set(email, { 
      otp, 
      formData: { email, firstName, lastName, country, name } 
    });
    
    // Send Email
    console.log(`[verify-email] Sending email to new user...`);
    const emailStartTime = Date.now();
    const emailResult = await sendEmail(
      email, 
      name || "User", 
      "Your Verification Code - Rewards For Education",
      `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #635BFF;">Welcome to Rewards For Education</h1>
        <p style="font-size: 16px; color: #333;">Hello ${name || 'there'},</p>
        <p style="font-size: 16px; color: #333;">Your verification code is:</p>
        <div style="background: #f6f9fc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h2 style="color: #635BFF; font-size: 32px; letter-spacing: 4px; margin: 0;">${otp}</h2>
        </div>
        <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
        <p style="font-size: 14px; color: #666;">If you didn't request this code, please ignore this email.</p>
      </div>`
    );
    console.log(`[verify-email] Email send completed in ${Date.now() - emailStartTime}ms`);

    if (!emailResult.success) {
      console.error("Failed to send email", emailResult);
      console.log(`OTP for ${email}: ${otp}`); // For debugging/fallback
      
      // Return the OTP in development mode so user can still verify
      // In production, you'd want to return an error
      const isDevelopment = process.env.NODE_ENV === 'development';
      
      if (isDevelopment) {
        return NextResponse.json({ 
          success: true, 
          message: "OTP sent (check console for OTP if email failed)",
          otp: otp, // Include OTP in response for development
          emailSent: false,
          error: emailResult.error
        });
      } else {
        return NextResponse.json({ 
          success: false, 
          error: "Failed to send email. Please try again later.",
          details: emailResult.error
        }, { status: 500 });
      }
    }

    console.log(`[verify-email] Email sent successfully to ${email}. Total time: ${Date.now() - startTime}ms`);
    return NextResponse.json({ success: true, message: "OTP sent", emailSent: true });
  } catch (error) {
    console.error(`[verify-email] Error after ${Date.now() - startTime}ms:`, error);
    return NextResponse.json({ 
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { email, otp } = await request.json();
    
    const stored = otpStore.get(email);
    
    if (!stored) {
      return NextResponse.json({ error: "OTP expired or not found" }, { status: 400 });
    }
    
    if (stored.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }
    
    // Create or update user account after OTP verification
    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    
    const existingUser = await db.collection("users").findOne({ email });
    
    if (existingUser) {
      // User exists - return their data so they can continue
      otpStore.delete(email);
      return NextResponse.json({ 
        success: true, 
        message: "Verified",
        user: existingUser,
        isNewUser: false
      });
    } else {
      // New user - create account with basic info from form
      const newUser = {
        ...stored.formData,
        email,
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      const result = await db.collection("users").insertOne(newUser);
      
      // Clear OTP after success
      otpStore.delete(email);
      
      return NextResponse.json({ 
        success: true, 
        message: "Verified and account created",
        user: { ...newUser, _id: result.insertedId },
        isNewUser: true
      });
    }
  } catch (error) {
    console.error("Error in PUT verify-email:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

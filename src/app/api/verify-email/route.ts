import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/zeptomail";
import clientPromise from "@/lib/mongodb";

// In-memory store for OTPs (Note: Resets on server restart/lambda cold start)
// In production, use Redis or Database
const otpStore = new Map<string, { otp: string; formData: any }>();

export async function POST(request: Request) {
  try {
    const { email, name, firstName, lastName, country } = await request.json();
    
    // Check if user already exists
    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    const existingUser = await db.collection("users").findOne({ email });
    
    if (existingUser) {
      // User exists, send OTP but don't create new account
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(email, { otp, formData: existingUser });
      
      // Send email
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

    console.log(`Email sent successfully to ${email}`);
    return NextResponse.json({ success: true, message: "OTP sent", emailSent: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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

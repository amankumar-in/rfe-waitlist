import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { sendEmail } from "@/lib/zeptomail";

type LeadMode = "info" | "offer";

interface LeadPayload {
  mode: LeadMode;
  fullName: string;
  email: string;
  phone?: string;
  college: string;
  designation: string;
  message?: string;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

const sanitize = (s: unknown, max = 500) =>
  typeof s === "string" ? s.trim().slice(0, max) : "";

const escape = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadPayload>;

    const mode: LeadMode = body.mode === "offer" ? "offer" : "info";
    const fullName = sanitize(body.fullName, 120);
    const email = sanitize(body.email, 200).toLowerCase();
    const phone = sanitize(body.phone, 40);
    const college = sanitize(body.college, 200);
    const designation = sanitize(body.designation, 120);
    const message = sanitize(body.message, 2000);

    if (!fullName || !email || !college || !designation) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!isEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("rfe_waitlist");
    const collection = db.collection("college_leads");

    const downloadToken =
      mode === "offer" ? crypto.randomBytes(24).toString("hex") : null;

    const now = new Date();
    const lead = {
      mode,
      fullName,
      email,
      phone: phone || null,
      college,
      designation,
      message: message || null,
      downloadToken,
      downloadCount: 0,
      lastDownloadedAt: null as Date | null,
      createdAt: now,
      updatedAt: now,
    };

    await collection.insertOne(lead);

    const origin = new URL(request.url).origin;

    if (mode === "offer" && downloadToken) {
      const downloadUrl = `${origin}/api/college-leads/download?token=${downloadToken}`;
      await sendEmail(
        email,
        fullName,
        "Your CFC College Partnership Offer",
        offerEmail({
          fullName,
          college,
          downloadUrl,
        })
      );
    } else {
      await sendEmail(
        email,
        fullName,
        "Your inquiry has been received",
        infoEmail({ fullName, college, message })
      );
    }

    return NextResponse.json({ success: true, mode });
  } catch (error) {
    console.error("[college-leads] error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const offerEmail = ({
  fullName,
  college,
  downloadUrl,
}: {
  fullName: string;
  college: string;
  downloadUrl: string;
}) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0A2540;">
  <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px;">
    <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #635BFF; font-weight: 700;">
      Rewards For Education / Institutions
    </div>
  </div>
  <h1 style="font-size: 26px; font-weight: 700; line-height: 1.2; margin: 0 0 18px;">
    Your partnership offer is ready, ${escape(fullName)}.
  </h1>
  <p style="font-size: 16px; line-height: 1.6; color: #425466; margin: 0 0 14px;">
    Thank you for your interest on behalf of <strong style="color:#0A2540">${escape(college)}</strong>. The CFC College Partnership Offer document is attached to this verified link.
  </p>
  <p style="font-size: 16px; line-height: 1.6; color: #425466; margin: 0 0 28px;">
    Please use the button below to download the document.
  </p>
  <a href="${downloadUrl}" style="display: inline-block; background: #0A2540; color: #ffffff; padding: 14px 28px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 15px;">
    Download partnership offer
  </a>
  <p style="font-size: 13px; line-height: 1.6; color: #94a3b8; margin: 32px 0 0;">
    If the button doesn't work, copy and paste this link into your browser:<br>
    <span style="color: #635BFF; word-break: break-all;">${downloadUrl}</span>
  </p>
  <div style="border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #94a3b8;">
    A team member will be in touch shortly to discuss next steps.<br>
    Coins for College · institutions@coinsforcollege.org
  </div>
</div>
`;

const infoEmail = ({
  fullName,
  college,
  message,
}: {
  fullName: string;
  college: string;
  message: string;
}) => `
<div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; color: #0A2540;">
  <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px;">
    <div style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #635BFF; font-weight: 700;">
      Rewards For Education / Institutions
    </div>
  </div>
  <h1 style="font-size: 26px; font-weight: 700; line-height: 1.2; margin: 0 0 18px;">
    We received your inquiry, ${escape(fullName)}.
  </h1>
  <p style="font-size: 16px; line-height: 1.6; color: #425466; margin: 0 0 14px;">
    Thank you for reaching out on behalf of <strong style="color:#0A2540">${escape(college)}</strong>. A member of our institutional partnerships team will respond within two business days.
  </p>
  ${
    message
      ? `<div style="background:#F6F9FC; padding:16px 18px; border-radius:12px; margin: 18px 0 22px; font-size:14px; color:#425466; line-height:1.6;"><strong style="color:#0A2540">Your message:</strong><br>${escape(
          message
        ).replace(/\n/g, "<br>")}</div>`
      : ""
  }
  <p style="font-size: 16px; line-height: 1.6; color: #425466; margin: 0;">
    In the meantime, you can request the full partnership offer at any time from our institutions page.
  </p>
  <div style="border-top: 1px solid #e2e8f0; margin-top: 40px; padding-top: 20px; font-size: 12px; color: #94a3b8;">
    Coins for College · institutions@coinsforcollege.org
  </div>
</div>
`;

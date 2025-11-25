import nodemailer from 'nodemailer';

// ZeptoMail Configuration using SMTP
// Get your API key from: https://www.zeptomail.com/
// Add it to your .env.local file as ZEPTOMAIL_API_KEY
export const ZEPTOMAIL_CONFIG = {
  apiKey: (process.env.ZEPTOMAIL_API_KEY || "").trim(),
  fromEmail: process.env.ZEPTOMAIL_FROM_EMAIL || "noreply@coinsforcollege.org",
  fromName: process.env.ZEPTOMAIL_FROM_NAME || "Rewards For Education",
};

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    if (!ZEPTOMAIL_CONFIG.apiKey) {
      throw new Error("ZeptoMail API key is not configured. Please set ZEPTOMAIL_API_KEY in your .env.local file");
    }

    transporter = nodemailer.createTransport({
      host: "smtp.zeptomail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "emailapikey", // This is literal, not a variable
        pass: ZEPTOMAIL_CONFIG.apiKey
      },
      connectionTimeout: 5000, // 5 seconds timeout for connection
      greetingTimeout: 5000, // 5 seconds timeout for greeting
      socketTimeout: 15000, // 15 seconds timeout for socket operations
      pool: true, // Use connection pooling
    });
  }
  return transporter;
}

export async function sendEmail(toEmail: string, toName: string, subject: string, htmlBody: string) {
  try {
    // Check if API key is configured
    if (!ZEPTOMAIL_CONFIG.apiKey) {
      console.error("ZeptoMail API key is not configured. Please set ZEPTOMAIL_API_KEY in your .env.local file");
      return { 
        success: false, 
        error: "Email service not configured. Please contact support." 
      };
    }

    const mailTransporter = getTransporter();

    console.log("Sending email to:", toEmail);
    console.log("From:", `${ZEPTOMAIL_CONFIG.fromName} <${ZEPTOMAIL_CONFIG.fromEmail}>`);

    const mailOptions = {
      from: `"${ZEPTOMAIL_CONFIG.fromName}" <${ZEPTOMAIL_CONFIG.fromEmail}>`,
      to: toEmail,
      subject: subject,
      html: htmlBody,
    };

    // Add timeout wrapper for email sending (15 seconds total)
    const emailPromise = mailTransporter.sendMail(mailOptions);
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("Email sending timeout after 15 seconds")), 15000);
    });

    const info = await Promise.race([emailPromise, timeoutPromise]);
    
    console.log("Email sent successfully:", info.messageId);
    return { success: true, data: { messageId: info.messageId } };
  } catch (error) {
    console.error("ZeptoMail SMTP Error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

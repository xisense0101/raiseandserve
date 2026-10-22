import { NextRequest, NextResponse } from "next/server";
import { getClientIp, checkRateLimit } from "@/lib/rateLimit";
import { resend } from "@/lib/resend";
import { escapeHtml } from "@/lib/security";
import { verifyTurnstile } from "@/lib/turnstile";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    // Parse body
    const body = await req.json();

    // Bot check first, so automated traffic never consumes a visitor's rate-limit slot.
    const verification = await verifyTurnstile(body?.turnstileToken, ip, "contact");
    if (!verification.ok) {
      return NextResponse.json({ error: verification.error }, { status: verification.status });
    }

    // Rate limiting
    const { allowed, remainingMs } = checkRateLimit(ip);
    
    if (!allowed) {
      const minutesRemaining = Math.ceil(remainingMs / 1000 / 60);
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${minutesRemaining} minute(s) before trying again.` },
        { status: 429 }
      );
    }
    const { fullName, email, inquiryType, message } = body;

    if (!fullName?.trim() || !email?.trim() || !inquiryType?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required. Please fill out full name, email, inquiry type, and message." },
        { status: 400 }
      );
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 3. Send Email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || "onboarding@resend.dev";

    const inquiryLabels: Record<string, string> = {
      general: "General Question",
      donation: "Donation Support",
      volunteer: "Volunteer Opportunities",
      partnership: "Community Partnership",
    };

    const label = inquiryLabels[inquiryType] || inquiryType;

    const emailData = await resend.emails.send({
      from: `RISE Contact Form <${fromEmail}>`,
      to: toEmail,
      subject: `New Contact Form Submission: ${fullName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
          <div style="background-color: #0a192f; color: #ffffff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; font-weight: bold; letter-spacing: 0.05em; color: #ffbf00;">RISE APPLICATION INQUIRY</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;">Contact Form Submission</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; color: #334155;">
            <p style="font-size: 14px; margin-top: 0; color: #64748b;">You have received a new message from the contact form on riseandserve.org.</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; width: 140px; border-bottom: 1px solid #f1f5f9;">Full Name</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Email Address</td>
                <td style="padding: 8px 0; font-size: 14px; color: #007ed1; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(email)}" style="color: #007ed1; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Inquiry Type</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 500; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(label)}</td>
              </tr>
            </table>

            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 24px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message Details</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </div>
          <div style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
            Sent automatically from riseandserve.org. Please reply directly to this email to communicate with the user.
          </div>
        </div>
      `,
    });

    if (emailData.error) {
      console.error("Resend API Error:", emailData.error);
      return NextResponse.json(
        { error: "Failed to dispatch email inquiry. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: emailData.data?.id });
  } catch (error: any) {
    console.error("Contact Form Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

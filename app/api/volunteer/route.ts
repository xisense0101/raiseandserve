import { NextRequest, NextResponse } from "next/server";
import { getClientIp, checkRateLimit } from "@/lib/rateLimit";
import { resend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate Limiting
    const ip = getClientIp(req);
    const { allowed, remainingMs } = checkRateLimit(ip);
    
    if (!allowed) {
      const minutesRemaining = Math.ceil(remainingMs / 1000 / 60);
      return NextResponse.json(
        { error: `Too many submissions. Please wait ${minutesRemaining} minute(s) before trying again.` },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Body
    const body = await req.json();
    const { fullName, email, phone, volunteeredBefore, selectedEvents, helpOptions } = body;

    // Validation
    if (!fullName?.trim() || !email?.trim() || !volunteeredBefore) {
      return NextResponse.json(
        { error: "Required fields are missing. Please provide name, email, and whether you have volunteered before." },
        { status: 400 }
      );
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!Array.isArray(selectedEvents) || selectedEvents.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one event you'd like to volunteer for." },
        { status: 400 }
      );
    }

    // If RISE Catfish King Event is selected, we require help options
    const hasCatfishEvent = selectedEvents.includes("RISE Catfish King Event");
    if (hasCatfishEvent && (!Array.isArray(helpOptions) || helpOptions.length === 0)) {
      return NextResponse.json(
        { error: "Please select how you would like to help for the RISE Catfish King Event." },
        { status: 400 }
      );
    }

    // 3. Send Email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || "onboarding@resend.dev";

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
        <div style="background-color: #0a192f; color: #ffffff; padding: 24px; text-align: center;">
          <span style="background-color: rgba(255, 155, 0, 0.15); border: 1px solid rgba(255, 155, 0, 0.3); color: #ff9b00; font-size: 10px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 9999px;">New Volunteer Registration</span>
          <h1 style="margin: 8px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">RISE VOLUNTEER SIGN-UP</h1>
        </div>
        <div style="padding: 24px; background-color: #ffffff; color: #334155;">
          <p style="font-size: 14px; margin-top: 0; color: #64748b;">
            A new volunteer application has been submitted on <strong>riseandserve.org</strong>.
          </p>
          
          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 20px; margin-bottom: 12px;">
            Volunteer Information
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; width: 180px; border-bottom: 1px solid #f1f5f9;">Full Name</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Email Address</td>
              <td style="padding: 8px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #007ed1; text-decoration: none; font-weight: 500;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Phone Number</td>
              <td style="padding: 8px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Volunteered Before?</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: ${volunteeredBefore.toLowerCase() === "yes" ? "#16a34a" : "#4b5563"}; border-bottom: 1px solid #f1f5f9;">
                ${volunteeredBefore}
              </td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 20px; margin-bottom: 12px;">
            Selected Events
          </h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #0f172a; line-height: 1.6;">
            ${selectedEvents.map((event: string) => `<li style="margin-bottom: 6px; font-weight: 600;">${event}</li>`).join("")}
          </ul>

          ${hasCatfishEvent ? `
            <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 20px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">How to Help (RISE Catfish King Event)</p>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #334155; line-height: 1.6;">
                ${helpOptions.map((option: string) => `<li style="margin-bottom: 4px;">${option}</li>`).join("")}
              </ul>
            </div>
          ` : ""}
        </div>
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8;">
          Sent automatically from riseandserve.org. Please reply directly to this email to contact the volunteer.
        </div>
      </div>
    `;

    const emailData = await resend.emails.send({
      from: `RISE Volunteer Portal <${fromEmail}>`,
      to: toEmail,
      subject: `New Volunteer Application: ${fullName}`,
      replyTo: email,
      html: emailHtml,
    });

    if (emailData.error) {
      console.error("Resend API Error (Volunteer):", emailData.error);
      return NextResponse.json(
        { error: "Failed to dispatch email registration. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: emailData.data?.id });
  } catch (error: any) {
    console.error("Volunteer Form Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

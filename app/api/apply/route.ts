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

    // 2. Parse Multipart FormData
    const formData = await req.formData();

    // Extract Text Fields
    const firstName = formData.get("firstName") as string || "";
    const lastName = formData.get("lastName") as string || "";
    const email = formData.get("email") as string || "";
    const phone = formData.get("phone") as string || "";
    const city = formData.get("city") as string || "";
    const state = formData.get("state") as string || "";
    const educationLevel = formData.get("educationLevel") as string || "";
    const institution = formData.get("institution") as string || "";
    const fieldOfStudy = formData.get("fieldOfStudy") as string || "";
    const graduationYear = formData.get("graduationYear") as string || "";
    const targetCareerArea = formData.get("targetCareerArea") as string || "";
    const workAuthorization = formData.get("workAuthorization") as string || "";
    const availability = formData.get("availability") as string || "";
    const priorExperience = formData.get("priorExperience") as string || "";
    const linkedinUrl = formData.get("linkedinUrl") as string || "";
    const referenceContact = formData.get("referenceContact") as string || "";
    const agreementString = formData.get("agreement") as string || "";
    
    // Parse array
    const opportunityTypesString = formData.get("opportunityTypes") as string || "";
    const opportunityTypes = opportunityTypesString ? opportunityTypesString.split(",") : [];

    // 3. Validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !educationLevel || !targetCareerArea.trim() || !workAuthorization || opportunityTypes.length === 0 || !priorExperience.trim() || !referenceContact.trim() || agreementString !== "true") {
      return NextResponse.json(
        { error: "Required fields are missing. Please complete all steps and accept the agreement." },
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

    // Extract File Fields
    const resumeFile = formData.get("resume") as File | null;
    const portfolioFile = formData.get("portfolio") as File | null;

    if (!resumeFile || resumeFile.size === 0) {
      return NextResponse.json(
        { error: "Resume file is required." },
        { status: 400 }
      );
    }

    // Server-side size checking (10MB for resume, 20MB for portfolio)
    if (resumeFile.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume file size exceeds the 10MB limit." },
        { status: 400 }
      );
    }

    if (portfolioFile && portfolioFile.size > 20 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Portfolio file size exceeds the 20MB limit." },
        { status: 400 }
      );
    }

    // 4. Convert Files to Buffers for Resend
    const attachments = [];

    // Convert Resume
    const resumeArrayBuffer = await resumeFile.arrayBuffer();
    const resumeBuffer = Buffer.from(resumeArrayBuffer);
    attachments.push({
      filename: resumeFile.name,
      content: resumeBuffer,
    });

    // Convert Portfolio if present
    if (portfolioFile && portfolioFile.size > 0) {
      const portfolioArrayBuffer = await portfolioFile.arrayBuffer();
      const portfolioBuffer = Buffer.from(portfolioArrayBuffer);
      attachments.push({
        filename: portfolioFile.name,
        content: portfolioBuffer,
      });
    }

    // 5. Send Email via Resend
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RESEND_TO_EMAIL || "onboarding@resend.dev";

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 650px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);">
        <div style="background-color: #0f1e36; color: #ffffff; padding: 28px; text-align: center;">
          <span style="background-color: rgba(255, 191, 0, 0.15); border: 1px solid rgba(255, 191, 0, 0.3); color: #ffbf00; font-size: 10px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; rounded-width: 9999px; border-radius: 9999px;">New Talent Network Request</span>
          <h1 style="margin: 10px 0 0 0; font-size: 22px; font-weight: 800; letter-spacing: 0.02em;">RISE APPLICATION RECEIVED</h1>
        </div>
        
        <div style="padding: 28px; background-color: #ffffff; color: #334155;">
          <p style="font-size: 15px; line-height: 1.6; margin-top: 0; color: #475569;">
            A new candidate has submitted an application form via <strong>riseandserve.org</strong>. Details and attached files are included below.
          </p>

          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 28px;">
            1. Personal Information
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; width: 180px; border-bottom: 1px solid #f1f5f9;">First Name</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Last Name</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Email Address</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #007ed1; text-decoration: none; font-weight: 500;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Phone Number</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Location</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${city ? `${city}, ` : ""}${state || "N/A"}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 28px;">
            2. Background & Career Goals
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; width: 180px; border-bottom: 1px solid #f1f5f9;">Education Level</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${educationLevel}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Institution / Program</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${institution || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Field of Study</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${fieldOfStudy || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Graduation Year</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${graduationYear || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Target Career</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${targetCareerArea}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Work Authorization</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${workAuthorization}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Availability</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${availability || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Opportunity Types</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${opportunityTypes.join(", ")}</td>
            </tr>
          </table>

          <h3 style="border-bottom: 2px solid #f1f5f9; padding-bottom: 6px; font-size: 14px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 28px;">
            3. URLs & References
          </h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; width: 180px; border-bottom: 1px solid #f1f5f9;">LinkedIn Profile</td>
              <td style="padding: 10px 0; font-size: 14px; border-bottom: 1px solid #f1f5f9;">
                ${linkedinUrl ? `<a href="${linkedinUrl}" style="color: #007ed1; text-decoration: none;">${linkedinUrl}</a>` : "N/A"}
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; border-bottom: 1px solid #f1f5f9;">Reference Contact</td>
              <td style="padding: 10px 0; font-size: 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${referenceContact}</td>
            </tr>
          </table>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-top: 28px;">
            <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Prior Experience / Personal Statement</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${priorExperience}</p>
          </div>
        </div>
        
        <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px; text-align: center; font-size: 11px; color: #94a3b8;">
          Sent automatically from riseandserve.org. Uploaded files (Resume, Portfolio if applicable) are attached to this message.
        </div>
      </div>
    `;

    const emailData = await resend.emails.send({
      from: `RISE Candidate Portal <${fromEmail}>`,
      to: toEmail,
      subject: `New Candidate Application: ${firstName} ${lastName}`,
      replyTo: email,
      html: emailHtml,
      attachments: attachments,
    });

    if (emailData.error) {
      console.error("Resend API Error (Applications):", emailData.error);
      return NextResponse.json(
        { error: "Failed to dispatch email application. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: emailData.data?.id });
  } catch (error: any) {
    console.error("Apply Page Server Error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

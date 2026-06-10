import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const WP_API = process.env.NEXT_PUBLIC_WP_API;

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, projectType, budget, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    // ── 1. Save to WordPress database ──────────────────────────────
    let wpSaved = false;
    let wpError = "";
    try {
      const wpRes = await fetch(`${WP_API}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, projectType, budget, message }),
      });
      if (wpRes.ok) {
        wpSaved = true;
      } else {
        const errBody = await wpRes.text();
        wpError = `WP API ${wpRes.status}: ${errBody}`;
        console.warn("WordPress quote save failed:", wpError);
      }
    } catch (err) {
      wpError = String(err);
      console.warn("WordPress quote save error:", wpError);
    }

    // ── 2. Send email notification ──────────────────────────────────
    let emailSent = false;
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Quote Form" <${process.env.EMAIL_USER}>`,
          to: "ashishshrmaa@outlook.com",
          replyTo: email,
          subject: `New Quote Request from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333; border-bottom: 2px solid #f0532d; padding-bottom: 10px;">New Quote Request</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #555; width: 140px;">Name:</td>
                  <td style="padding: 8px;">${name}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
                  <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #555;">Phone:</td>
                  <td style="padding: 8px;">${phone || "Not provided"}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold; color: #555;">Project Type:</td>
                  <td style="padding: 8px;">${projectType || "Not specified"}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #555;">Budget:</td>
                  <td style="padding: 8px;">${budget || "Not specified"}</td>
                </tr>
              </table>
              ${message ? `
              <div style="margin-top: 20px;">
                <h3 style="color: #333;">Project Details:</h3>
                <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #f0532d; border-radius: 4px;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>` : ""}
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Saved to WordPress DB: ${wpSaved ? "✅ Yes" : "❌ No — " + wpError}
              </p>
            </div>
          `,
        });
        emailSent = true;
      }
    } catch (err) {
      console.warn("Email send error:", err);
    }

    // ── 3. Return result ────────────────────────────────────────────
    if (wpSaved || emailSent) {
      return NextResponse.json({
        success: true,
        wpSaved,
        emailSent,
      });
    }

    return NextResponse.json(
      { error: "Failed to save your request. Please try again." },
      { status: 500 }
    );

  } catch (error) {
    console.error("Quote route error:", error);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

// You must set RESEND_API_KEY in your Vercel project environment variables
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["cmacrowther@gmail.com"], // Change to your email
      subject: `[Contact] ${subject}`,
      replyTo: email,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br/>${message}</p>`
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

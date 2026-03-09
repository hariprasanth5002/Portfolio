import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data.name || !data.email || !data.message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { name, email, message } = data;
        const TARGET_EMAIL = "hariprasanth5002@gmail.com"; // Your receiving email

        // Validate Environment variables
        if (!process.env.EMAIL_USER) {
            console.error("Missing EMAIL_USER environment variable.");
            return NextResponse.json({ error: "EMAIL_USER not set in environment." }, { status: 500 });
        }
        if (!process.env.EMAIL_PASS) {
            console.error("Missing EMAIL_PASS environment variable.");
            return NextResponse.json({ error: "EMAIL_PASS not set. Did you add your App Password?" }, { status: 500 });
        }

        // Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Verify transporter connection
        try {
            await transporter.verify();
            console.log("SMTP connection verified successfully.");
        } catch (verifyError: any) {
            console.error("SMTP Verification Error:", verifyError);
            return NextResponse.json({ error: `SMTP Verification failed: ${verifyError.message}` }, { status: 500 });
        }

        // Setup Email data
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: TARGET_EMAIL,
            replyTo: email,
            subject: `Portfolio Message: ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #4f46e5;">New Portfolio Message</h2>
                    <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
                    <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 10px;">
                        <p style="white-space: pre-wrap; margin: 0;">${message}</p>
                    </div>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
                    <p style="font-size: 12px; color: #6b7280;">Sent from your portfolio website.</p>
                </div>
            `,
        };

        // Send Email
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", TARGET_EMAIL);

        return NextResponse.json({ success: true, message: "Message sent successfully" });
    } catch (error: any) {
        console.error("Error sending email:", error);
        return NextResponse.json({
            error: error.message || "Failed to send email. Check your SMTP credentials."
        }, { status: 500 });
    }
}

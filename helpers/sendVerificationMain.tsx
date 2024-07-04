import { ApiResponse } from "@/types/ApiResponse";

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendVerificationEmail(email: string,
  username: string,
  verifyCode: string): Promise<ApiResponse> {
  try {
    const info = await transporter.sendMail({
      from: `"Ankush" <${process.env.EMAIL}>`,
      to: email,
      subject: "Expense Tracker - Verify your email",
      text: `Hello ${username}, Your verification code is ${verifyCode}`,
      html: `<b>Hello ${username}, Your verification code is ${verifyCode}</b>`,
    });

    return { success: true, message: 'Verification email sent successfully.' };
  } catch (error) {
    return { success: false, message: 'Failed to send verification email.' };
  }
}

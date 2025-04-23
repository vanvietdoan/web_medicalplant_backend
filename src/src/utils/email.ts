import nodemailer from "nodemailer";
import config from "../utils/config";

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: Number(config.smtp.port || "587"),
  auth: {
    user: config.smtp.username,
    pass: config.smtp.password,
  },
});

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const verificationUrl = `${config.frontEndUrl}/verify-email/${token}`;
  
  const mailOptions = {
    to: email,
    subject: "Verify Your Email",
    html: `
      <h1>Welcome to Our Platform!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
      <p>If you didn't create an account, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendNewPasswordEmail(email: string, newPassword: string): Promise<void> {
  const mailOptions = {
    to: email,
    subject: "Your New Password",
    html: `
      <h1>Your New Password</h1>
      <p>Here is your new password:</p>
      <p style="font-size: 16px; font-weight: bold; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${newPassword}</p>
      <p>Please change this password after logging in for security purposes.</p>
      <p>If you didn't request a new password, please contact our support team immediately.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

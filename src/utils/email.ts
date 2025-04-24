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
  const verificationUrl = `${config.frontEndUrl}/api/auth/verify-email/${token}`;
  
  const mailOptions = {
    to: email,
    subject: "Xác nhận Email của bạn",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Chào mừng đến với nền tảng của chúng tôi!</h1>
        <p style="color: #666;">Vui lòng nhấp vào nút bên dưới để xác nhận địa chỉ email của bạn:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4CAF50; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 4px; 
                    font-weight: bold;
                    display: inline-block;">
            Xác nhận đăng ký
          </a>
        </div>
        <p style="color: #666;">Liên kết này sẽ hết hạn sau 24 giờ.</p>
        <p style="color: #666;">Nếu bạn không tạo tài khoản, bạn có thể bỏ qua email này.</p>
      </div>
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

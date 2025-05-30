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
    subject: "[Quản lý cây thuốc] - Mật khẩu mới",
    html: `
      <h1>Mật khẩu mới của bạn</h1>
      <p>Mật khẩu mới của bạn là:</p>
      <p style="font-size: 16px; font-weight: bold; padding: 10px; background-color: #f5f5f5; border-radius: 5px;">${newPassword}</p>
      <p>Vui lòng đổi mật khẩu sau khi đăng nhập để đảm bảo an toàn.</p>
      <p>Nếu bạn không yêu cầu mật khẩu mới, vui lòng liên hệ với nhóm hỗ trợ của chúng tôi ngay lập tức.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'pElSH2Tz1y1yIY8',
    name: process.env.DB_DATABASE || 'datn',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    username: process.env.SMTP_USERNAME || "vietdoanha2019@gmail.com",
    password: process.env.SMTP_PASSWORD || "lpic igqo fujj rmud",
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
  jwtSecretEmail: process.env.JWT_SECRET_EMAIL ||'secret',
  nodeEnv: process.env.NODE_ENV || 'development',
  tokenExpiresIn: Number(process.env.TOKEN_EXPIRES_IN) || 3600,
  frontEndUrl: process.env.FRONT_END_URL || "http://localhost:2204",
};

export default config;
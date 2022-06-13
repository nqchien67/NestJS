require('dotenv').config();
export default {
  NODE_ENV: process.env.NODE_ENV,
  SERVER_PORT: Number(process.env.SERVER_PORT) || 3000,
  APP_NAME: 'Run Crew',
  /**1 day */
  CACHE_EXPIRED: Number(process.env.CACHE_EXPIRED) || 86400,
  AUTH: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    BCRYPT_HASH_ROUNDS: Number(process.env.BCRYPT_HASH_ROUNDS),
    MAX_RETRY: Number(process.env.MAX_RETRY),
    VERIFY_CODE_TTL: Number(process.env.VERIFY_CODE_TTL),
    DELAY_BETWEEN_RETRY: Number(process.env.DELAY_BETWEEN_RETRY),
    REGISTER_CODE_EXPIRES_IN: process.env.REGISTER_CODE_EXPIRES_IN,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT),
    DB: Number(process.env.REDIS_DB),
    CACHE_DB: Number(process.env.REDIS_CACHE_DB),
    PASSWORD: process.env.REDIS_PASSWORD,
  },
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: Number(process.env.MYSQL_PORT),
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASS,
    DB_NAME: process.env.MYSQL_DBNAME,
  },
  MONGO: {
    URI: process.env.MONGO_URI,
  },
  UPLOAD: {
    MAX_FILES: 10,
    S3_REGION: process.env.AWS_S3_REGION,
    S3_BUCKET: process.env.AWS_S3_BUCKET,
    S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    S3_DOMAIN: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
    THUMBS: ['', ...process.env.AWS_S3_THUMBS.split(' ').filter((item) => item)],
  },
  WEBHOOK: {
    TEAMS_WEBHOOK_URL: process.env.TEAMS_WEBHOOK_URL,
  },
  ONESIGNAL: {
    APP_ID: process.env.ONE_SIGNAL_APP_ID,
    REST_KEY: process.env.ONE_SIGNAL_REST_KEY,
  },
  IN_APP_PURCHASE: {
    APPLE: {
      URL_SANDBOX: process.env.APPLE_URL_SANDBOX,
      URL_PRODUCTION: process.env.APPLE_URL_PRODUCTION,
      PASSWORD: process.env.APPLE_PASSWORD,
    },
  },

  MAIL: {
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM: process.env.MAIL_FROM,
  },

  SMS: {
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SERVICE_SID: process.env.TWILIO_SERVICE_SID,
  },
};

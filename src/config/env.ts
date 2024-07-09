import { parseBoolean } from "@/utils";
import "dotenv/config";
import type { Dialect } from "sequelize";

type Fallback = string | number | boolean | undefined;

function getEnv<Result extends any = string, FB extends Fallback = undefined>(
  key: string,
  fallback?: FB
): Result | FB {
  const value = process.env[key];

  if ([undefined, null, ""].includes(value)) {
    return fallback as FB;
  }

  return value as Result;
}

/**
 * Application Env
 */
const appEnv = {
  // Application environment
  NODE_ENV: getEnv("NODE_ENV", "development"),

  APP_KEY: getEnv("APP_KEY"),
  APP_NAME: getEnv("APP_NAME", "ebelize"),
  APP_PORT: Number(getEnv("APP_PORT", 8000)),

  RATE_LIMITER_LIMIT: Number(getEnv("RATE_LIMITER_LIMIT", 100)),
  RATE_LIMITER_RESET: getEnv("RATE_LIMITER_RESET", "15m"),
};

/**
 * Secret Env
 */
const secretEnv = {
  // JWT
  JWT_SECRET_ACCESS_TOKEN: getEnv(
    "JWT_SECRET_ACCESS_TOKEN",
    "verySecretAccessToken"
  ),
  JWT_ACCESS_TOKEN_EXPIRED: getEnv("JWT_ACCESS_TOKEN_EXPIRED", "1d"),

  JWT_SECRET_REFRESH_TOKEN: getEnv(
    "JWT_SECRET_REFRESH_TOKEN",
    "verySecretRefreshToken"
  ),
  JWT_REFRESH_TOKEN_EXPIRED: getEnv("JWT_REFRESH_TOKEN_EXPIRED", "7d"),
};

/**
 * Base URL Env
 */
const baseUrlEnv = {
  // Development
  URL_CLIENT_DEVELOPMENT: getEnv(
    "URL_CLIENT_DEVELOPMENT",
    "http://localhost:3000"
  ),
  URL_API_DEVELOPMENT: getEnv("URL_API_DEVELOPMENT", "http://localhost:8000"),

  // Staging
  URL_CLIENT_STAGING: getEnv("URL_CLIENT_STAGING", "example.domain.com"),
  URL_API_STAGING: getEnv("URL_API_STAGING", "api.example.domain.com"),

  // Production
  URL_CLIENT_PRODUCTION: getEnv("URL_CLIENT_PRODUCTION", "example.domain.com"),
  URL_API_PRODUCTION: getEnv("URL_API_PRODUCTION", "api.example.domain.com"),
};

/**
 * Database Env
 */
const databaseEnv = {
  SEQUELIZE_CONNECTION: getEnv<Dialect, Dialect>(
    "SEQUELIZE_CONNECTION",
    "mysql"
  ),
  SEQUELIZE_HOST: getEnv("SEQUELIZE_HOST", "127.0.0.1"),
  SEQUELIZE_PORT: Number(getEnv("SEQUELIZE_PORT", 5432)),
  SEQUELIZE_DATABASE: getEnv("SEQUELIZE_DATABASE", "ebelize"),
  SEQUELIZE_USERNAME: getEnv("SEQUELIZE_USERNAME", "postgres"),
  SEQUELIZE_PASSWORD: getEnv("SEQUELIZE_PASSWORD"),
  SEQUELIZE_SYNC: parseBoolean(getEnv("SEQUELIZE_SYNC", false)),
  SEQUELIZE_LOGGING: parseBoolean(getEnv("SEQUELIZE_LOGGING", true)),
  SEQUELIZE_TIMEZONE: getEnv("SEQUELIZE_TIMEZONE", "Asia/Jakarta"),
};

/**
 * SMTP Env
 */
const mailEnv = {
  // default smtp
  MAIL_DRIVER: getEnv("MAIL_DRIVER", "smtp"),
  MAIL_HOST: getEnv("MAIL_HOST", "smtp.mailtrap.io"),
  MAIL_PORT: Number(getEnv("MAIL_PORT", 2525)),
  MAIL_AUTH_TYPE: getEnv("MAIL_AUTH_TYPE"),
  MAIL_USERNAME: getEnv("MAIL_USERNAME"),
  MAIL_PASSWORD: getEnv("MAIL_PASSWORD"),
  MAIL_ENCRYPTION: getEnv("MAIL_ENCRYPTION"),

  // mailgun smtp
  MAILGUN_API_KEY: getEnv("MAILGUN_API_KEY"),
  MAILGUN_DOMAIN: getEnv("MAILGUN_DOMAIN"),

  // google OAuth smtp
  OAUTH_CLIENT_ID: getEnv("OAUTH_CLIENT_ID"),
  OAUTH_CLIENT_SECRET: getEnv("OAUTH_CLIENT_SECRET"),
  OAUTH_REDIRECT_URL: getEnv("OAUTH_REDIRECT_URL"),
  OAUTH_REFRESH_TOKEN: getEnv("OAUTH_REFRESH_TOKEN"),
};

export const env = {
  ...appEnv,
  ...secretEnv,
  ...baseUrlEnv,
  ...databaseEnv,
  ...mailEnv,
};

import process from 'node:process';
import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  LOG_LEVEL: z
    .enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
  HOST: z.string().default('0.0.0.0'),
  PORT: z.coerce.number().positive().default(8000),
  SESSION_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

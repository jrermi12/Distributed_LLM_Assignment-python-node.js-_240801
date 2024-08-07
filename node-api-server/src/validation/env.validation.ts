import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ required_error: "Port number is required" }),
    NODE_ENV: z.enum(['development', "production", "test"]),
    PYTHON_SERVICE_URL:z.string()
});

export type EnvConfig = z.infer<typeof envSchema>;


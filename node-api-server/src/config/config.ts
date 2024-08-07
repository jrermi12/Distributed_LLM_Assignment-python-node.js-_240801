import dotenv from 'dotenv';
import { EnvConfig, envSchema } from '../validation/env.validation';
import { ZodError } from 'zod';
import { logger } from '../utils/logger';
import { env } from 'process';
dotenv.config();


export const validateEnv = () => {
    try {
        const envVars: EnvConfig = envSchema.parse(process.env);
        return {
            port: +envVars.PORT,
            env: envVars.NODE_ENV,
            PYTHON_SERVICE_URL: envVars.PYTHON_SERVICE_URL
        };
    } catch (error) {
        if (error instanceof ZodError) {
            console.log('Validation failed:', error.errors);
        } else {
            console.log('Error parsing environment variables:', error);
        }
    }

}

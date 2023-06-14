import { registerAs } from "@nestjs/config";

export default registerAs(
    'app',
    (): Record<string, any> => ({
        env: process.env.APP_ENV || 'development',
    })
);
import type { Config } from "drizzle-kit";
import "dotenv/config";
 
export default {
  schema: './src/database/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@aws.connect.psdb.cloud/${process.env.DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
  },
  breakpoints: true,
} satisfies Config;

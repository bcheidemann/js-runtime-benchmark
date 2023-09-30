import 'dotenv/config';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

declare var Deno: any;

const connection = connect({
  host: process ? process.env.DATABASE_HOST : Deno.env.get('DATABASE_HOST'),
  username: process ? process.env.DATABASE_USERNAME : Deno.env.get('DATABASE_USERNAME'),
  password: process ? process.env.DATABASE_PASSWORD : Deno.env.get('DATABASE_PASSWORD'),
})

export const db = drizzle(connection)

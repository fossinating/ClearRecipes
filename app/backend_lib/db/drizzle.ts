import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import * as schema from './schema';
import { NextRequest } from 'next/server';

const connection = connect({
  url: process.env.DATABASE_URL,
  fetch: (url: string, init) => {
    delete (init as any)["cache"]; // Remove cache header
    return fetch(url, init);
  }
});

export const db = drizzle(connection, {schema, logger: true});
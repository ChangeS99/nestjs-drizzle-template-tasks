import type { Config } from 'drizzle-kit';

export default {
    schema: './src/drizzle/schema.ts',
    out: './src/drizzle/migrations',
    driver: 'better-sqlite',
    dbCredentials: {
        url: './src/drizzle/demo.db',
    },
} satisfies Config;
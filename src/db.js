import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres.uqfsznmeidntyixaqedh",
    host: "aws-0-us-west-1.pooler.supabase.com",
    password: "eleftheria6",
    database: "postgres",
    port: "6543",
});
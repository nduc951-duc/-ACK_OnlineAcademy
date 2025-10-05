import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'aws-1-ap-southeast-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.ukwkrkesukcdhysntjka',
    pool_mode: 'session',
    password: 'web_programing_ute',
  }
});

export default db;

module.exports = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DBNAME,
  supportBigNumbers: false,
  synchronize: true, // Do not use synchronize
  logging: true,
  charset: 'utf8mb4',
  migrationsTableName: 'typeorm_migration',
  entities: [
    'dist/database/entities/**/*{.ts,.js}',
    'dist/app/shared/**/entities/**/*{.ts,.js}',
    'dist/libs/**/entities/**/*{.ts,.js}',
  ],
  migrations: [
    'dist/database/migrations/**/*{.ts,.js}',
    'dist/app/shared/**/migrations/**/*{.ts,.js}',
    'dist/libs/**/migrations/**/*{.ts,.js}',
  ],
  subscribers: [
    'dist/database/subscribers/*{.ts,.js}',
    'dist/app/shared/**/subscribers/**/*{.ts,.js}',
    'dist/libs/**/subscribers/**/*{.ts,.js}',
  ],
  timezone: 'Z',
  cli: {
    entitiesDir: 'src/database/entities',
    migrationsDir: 'src/database/migrations',
    subscribersDir: 'src/database/subscribers',
  },
};

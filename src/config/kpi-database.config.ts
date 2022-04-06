import { registerAs } from '@nestjs/config';

export default registerAs('kpiDatabase', () => ({
  type: process.env.KPI_DATABASE_TYPE,
  host: process.env.KPI_DATABASE_HOST,
  port: process.env.KPI_DATABASE_PORT || 5432,
  username: process.env.KPI_DATABASE_USERNAME,
  password: process.env.KPI_DATABASE_PASSWORD,
  database: process.env.KPI_DATABASE_NAME,
  logging: true,
  migrationsRun: false,
}));

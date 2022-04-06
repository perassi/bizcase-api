import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  if (process.env.NODE_ENV === 'test') {
    return {
      default: {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: true,
      },

      kpi: {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        synchronize: true,
        logging: false,
      },
    };
  } else {
    return {
      default: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT || 5432,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: true,
        logging: true,
        migrationsRun: false,
      },

      kpi: {
        type: process.env.KPI_DATABASE_TYPE,
        host: process.env.KPI_DATABASE_HOST,
        port: process.env.KPI_DATABASE_PORT || 5432,
        username: process.env.KPI_DATABASE_USERNAME,
        password: process.env.KPI_DATABASE_PASSWORD,
        database: process.env.KPI_DATABASE_NAME,
        logging: true,
        migrationsRun: false,
      },
    };
  }
});

import { Pool } from 'pg';

const KPI_DB_CONNECTION = 'postgres://postgres:V*%26fV%40Bu%3FCdB4m2v@3.222.200.206:5432/capdata';
const TABLE_NAME = 'kpi_libs';
const GET_KPI_BY_ID_QUERY = (id) => (`SELECT * from ${TABLE_NAME} where id = ${id}`);

export const getKpiLibById = async (id: number) => {
  try {
    const pool = new Pool({
      connectionString: KPI_DB_CONNECTION,
    });
    await pool.connect();

    const res = await pool.query(GET_KPI_BY_ID_QUERY(id));

    if (res.rowCount >= 1) {
      return res.rows[0];
    } else {
      return null;
    }
    await pool.end();
    return res;
  } catch (err) {
    throw err;
  }
};

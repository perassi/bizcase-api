import { getKpiLibById } from './kpiLibDataService';
import { Pool } from 'pg';

jest.mock('pg', () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

describe('KpiLibDataService', () => {
  let pool;
  beforeEach(async () => {
    pool = new Pool();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getKpiLibById', () => {
    it('should return kpi_libs id: 1', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [{
          id: 1,
          // data
        }],
        rowCount: 1,
      });
      const kpiLib = await getKpiLibById(1);

      expect(kpiLib).toHaveProperty('id', 1);
    });

    it('should return error id: 0', async () => {
      pool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
      });
      const kpiLib = await getKpiLibById(0);

      expect(kpiLib).toBe(null);
    });
  });
});

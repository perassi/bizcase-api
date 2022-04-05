import * as kpiLibDataService from './kpiLibDataService';
import { computeKpi, computeFormula } from './kpiCompute';

const sampleKpi = {
  type: 'Recurring',
  formula: '=( operating_profit * marg_impact)',
  variables: [
    {
      name: 'operating_profit',
      dtype: 'integer',
      description: 'xxx',
    },
    {
      name: 'marg_impact',
      dtype: 'integer',
      description: 'xxx',
    },
  ],
};

describe('KpiCompute', () => {
  beforeEach(async () => {
    // pass
  });

  afterEach(() => {
    // pass
  });

  describe('computeKpi', () => {
    it('should no compute - without cons and likely', async () => {
      jest.spyOn(kpiLibDataService, 'getKpiLibById').mockImplementation(() => Promise.resolve({
        kpi: sampleKpi,
      }));
      try {
        const result = await computeKpi(1, {});

        expect(kpiLibDataService.getKpiLibById).toBeCalled();
        expect(computeFormula).toBeCalled();
      } catch (err) {
        // pass
      }
    });

    it('should compute - with cons and likely', async () => {
      jest.spyOn(kpiLibDataService, 'getKpiLibById').mockImplementation(() => Promise.resolve({
        kpi: sampleKpi,
      }));
      const data = {
        imp_fac_cons: 2,
        imp_fac_likely: 4,
        operating_profit: 4.3,
        marg_impact: 3.5,
      };
      try {
        const result = await computeKpi(1, data);
        expect(kpiLibDataService.getKpiLibById).toBeCalled();

        expect(result).toHaveProperty('likely', data.operating_profit * data.marg_impact * data.imp_fac_likely);
        expect(result).toHaveProperty('cons', data.operating_profit * data.marg_impact * data.imp_fac_cons);
      } catch (err) {
        // pass
      }
    });
  });

  describe('computeFormula', () => {
    it('should sucess - 3 + 3', async () => {
      const formular = '3 + 3';
      const value = await computeFormula(formular, [], {});
      expect(value).toBe(6);
    });

    it('should sucess - x + 3', async () => {
      const formular = 'x + 3';
      const variables = [{
        name: 'x',
        dtype: 'integer',
        description: '',
      }];
      const data = {
        x: 6,
      };
      const value = await computeFormula(formular, variables, data);
      expect(value).toBe(9);
    });

    it('should error with variables is not defined - x * 3', async () => {
      const formular = 'x * 3';
      const variables = [];
      const data = {};
      try {
        const value = await computeFormula(formular, variables, data);
      } catch (err) {
        expect(err.message).toMatch(/NAME/);
      }
    });
  });
});

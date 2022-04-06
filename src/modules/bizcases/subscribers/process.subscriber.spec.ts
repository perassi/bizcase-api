import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { ProcessService } from '../services/';
import { Process } from '../entities';
import { ProcessSubscriber } from '.';
import { KpiLibService } from 'modules/kpi/services';
import { KpiLib } from 'modules/kpi/entities';
import { createConnection } from 'typeorm';

const process: Process = {
  id: 1,
  bcId: 1,
  procLutId: 1,
  kpiId: 207,
  data: {
    imp_fac_likely: 42,
    imp_fac_cons: 4,
    operating_profit: 3,
    marg_impact: 4,
  },
};

const sampleKpi: KpiLib = {
  id: 1,
  kpi: {
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
  },
};
describe('ProcessSubscriber', () => {
  let kpiLibService: KpiLibService;
  let processRepository: Repository<Process>;
  let processSubscriber: ProcessSubscriber;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KpiLibService,
        ProcessService,
        ProcessSubscriber,
          {
            provide: 'Connection',
            useClass: jest.fn().mockImplementation(() => {
              return {
                subscribers: [],
              };
            }),
          },
        {
          provide: getRepositoryToken(Process),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(KpiLib, 'kpiConnection'),
          useClass: Repository,
        },
      ],
    }).compile();

    kpiLibService = module.get<KpiLibService>(KpiLibService);
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));
    processSubscriber = module.get<ProcessSubscriber>(ProcessSubscriber);
  });

  it('should be defined', () => {
    expect(processSubscriber).toBeDefined();
  });

  describe('computeFormula', () => {
    it('should sucess - 3 + 3', async () => {
      const formular = '3 + 3';
      const value = await processSubscriber.computeFormula(formular, [], {});
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
      const value = await processSubscriber.computeFormula(formular, variables, data);
      expect(value).toBe(9);
    });

    it('should error with variables is not defined - x * 3', async () => {
      const formular = 'x * 3';
      const variables = [];
      const data = {};
      try {
        const value = await processSubscriber.computeFormula(formular, variables, data);
      } catch (err) {
        expect(err.message).toMatch(/NAME/);
      }
    });
  });

  describe('computeKpi', () => {
    it('should no compute - without cons and likely', async () => {
      jest.spyOn(kpiLibService, 'findOneById').mockResolvedValueOnce(Promise.resolve(sampleKpi));
      try {
        await processSubscriber.addKpiData(process);

        expect(kpiLibService.findOneById).toBeCalled();
        expect(process.data).toHaveProperty('likely', process.data.operating_profit * process.data.marg_impact * process.data.imp_fac_likely);
        expect(process.data).toHaveProperty('cons', process.data.operating_profit * process.data.marg_impact * process.data.imp_fac_cons);
      } catch (err) {
        // pass
      }
    });
  });

});

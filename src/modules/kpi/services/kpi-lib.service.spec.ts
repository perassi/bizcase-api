import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KpiLib } from '../entities';
import { KpiLibService } from '../services';

const data: KpiLib = {
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
  id: 1,
};

describe('KpiLibService', () => {
  let kpiLibService: KpiLibService;
  let kpiLibRepository: Repository<KpiLib>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KpiLibService,
        {
          provide: getRepositoryToken(KpiLib, 'kpiConnection'),
          useClass: Repository,
        },
      ],
    }).compile();

    kpiLibService = module.get<KpiLibService>(KpiLibService);
    kpiLibRepository = module.get<Repository<KpiLib>>(getRepositoryToken(KpiLib, 'kpiConnection'));
  });

  it('should be defined', () => {
    expect(kpiLibService).toBeDefined();
  });

  describe('findOneById', () => {
    it.only('should return an kpiLib', async () => {
      jest.spyOn(kpiLibRepository, 'findOne').mockResolvedValueOnce(data);

      expect(await kpiLibService.findOneById(1)).toBe(data);
    });
  });
});

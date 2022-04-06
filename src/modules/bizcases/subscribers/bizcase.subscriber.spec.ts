import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Process, BcTemplate } from '../entities';

import { MODULE } from '../../../app.module';
import { seedData } from '@/test/fixtures';
import { BizcaseSubscriber } from './bizcase.subscriber';
import { BizcaseService, ProcessService } from '../services';
import { TPL_PROCESSES } from '@/test/fixtures/data';

describe('BizcaseSubscriber', () => {
  let bcTemplateRepository: Repository<BcTemplate>;
  let bizcaseSubscriber: BizcaseSubscriber;
  let bizcaseService: BizcaseService;
  let processRepository: Repository<Process>;
  let module: TestingModule = null;

  beforeAll(async () => {
    module = await Test.createTestingModule(MODULE).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    await seedData(module);
    bcTemplateRepository = module.get<Repository<BcTemplate>>(getRepositoryToken(BcTemplate));
    bizcaseSubscriber = module.get<BizcaseSubscriber>(BizcaseSubscriber);
    bizcaseService = module.get<BizcaseService>(BizcaseService);
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));
  });

  it('should be defined', () => {
    expect(bizcaseSubscriber).toBeDefined();
  });

  it('should create processes on bizcase creation', async () => {
    const bizcase = await bizcaseService.create({
      title: 'test1',
      description: '',
      templateId: 1,
    });

    const kpiIdsToCreate = TPL_PROCESSES
      .filter(tpl => tpl.bcTemplateId === 1)
      .map(tpl => tpl.kpiId);
    const processes: Process[] = await processRepository.find({});
    processes.forEach(proc => {
      expect(kpiIdsToCreate).toContain(proc.kpiId);
    });
  });
});

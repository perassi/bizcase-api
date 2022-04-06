import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Process, BcTemplate, TplProcess } from '../entities';

import { MODULE } from '@/src/app.module';
import { loadFixtures } from '@/test/fixtures';
import { BizcaseSubscriber } from './bizcase.subscriber';
import { BizcaseService, ProcessService, TplProcessService } from '../services';

describe('BizcaseSubscriber', () => {
  let bcTemplateRepository: Repository<BcTemplate>;
  let bizcaseSubscriber: BizcaseSubscriber;
  let bizcaseService: BizcaseService;
  let processRepository: Repository<Process>;
  let tplProcessRepository: Repository<TplProcess>;
  let connection: Connection;
  let module: TestingModule = null;

  beforeAll(async () => {
    module = await Test.createTestingModule(MODULE).compile();

    connection = module.get<Connection>(Connection);
    bcTemplateRepository = module.get<Repository<BcTemplate>>(getRepositoryToken(BcTemplate));
    bizcaseSubscriber = module.get<BizcaseSubscriber>(BizcaseSubscriber);
    bizcaseService = module.get<BizcaseService>(BizcaseService);
    tplProcessRepository = module.get<Repository<TplProcess>>(getRepositoryToken(TplProcess));
    processRepository = module.get<Repository<Process>>(getRepositoryToken(Process));

    await loadFixtures(connection, 'test/fixtures');
  });

  afterAll(async () => {
    await module.close();
  });

  beforeEach(async () => {
    // pass
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

    const tplProcesses = await tplProcessRepository.find({ bcTemplateId: 1 });
    const kpiIdsToCreate = tplProcesses
      .filter(tpl => tpl.bcTemplateId === 1)
      .map(tpl => tpl.kpiId);
    const processes: Process[] = await processRepository.find({ bcId: bizcase.id });
    processes.forEach(proc => {
      expect(kpiIdsToCreate).toContain(proc.kpiId);
    });
  });
});

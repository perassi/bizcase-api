import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Process, BcTemplate, TplProcess, Bizcase } from '../entities';

import { MODULE } from '@/src/app.module';
import { loadFixtures } from '@/test/fixtures';
import { BizcaseService, ProcessService, TplProcessService } from '../services';

describe('BizcaseService', () => {
  let bizcaseRepository: Repository<Bizcase>;
  let bizcaseService: BizcaseService;
  let processRepository: Repository<Process>;
  let tplProcessRepository: Repository<TplProcess>;
  let connection: Connection;
  let module: TestingModule = null;

  beforeAll(async () => {
    module = await Test.createTestingModule(MODULE).compile();

    connection = module.get<Connection>(Connection);
    bizcaseService = module.get<BizcaseService>(BizcaseService);
    bizcaseRepository = module.get<Repository<Bizcase>>(getRepositoryToken(Bizcase));

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
    expect(bizcaseService).toBeDefined();
  });

  it('should clone a bizcase', async () => {
    const clonedBizcase = await bizcaseService.clone(1);
    const bizcase = await bizcaseRepository.findOne(1);

    expect(clonedBizcase).toHaveProperty('id');
    expect(clonedBizcase.id).not.toEqual(bizcase.id);
    expect(clonedBizcase.title).toBe(bizcase.title + '_cloned');
  });
});

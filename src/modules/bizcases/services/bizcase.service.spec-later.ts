import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'modules/users/entities';
import { Bizcase } from '../entities/bizcase.entity';
import { BizcaseService } from './bizcase.service';

const data: Bizcase[] = [
  {
    title: 'Bizcase 1',
    userId: 1,
    templateId: 2,
    description: null,
    roi: null,
    summary: null,
    id: 1,
  },
  {
    title: 'Bizcase 2',
    userId: 1,
    templateId: 2,
    description: null,
    roi: null,
    summary: null,
    id: 2,
  },
  {
    title: 'Bizcase 3',
    userId: 1,
    templateId: 2,
    description: null,
    roi: null,
    summary: null,
    id: 3,
  },
];

const user: User = {
  id: 1,
  email: 't@t.com',
  isActive: true,
};

describe('BizcaseService', () => {
  let bizcaseService: BizcaseService;
  let bizcaseRepository: Repository<Bizcase>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          // how you provide the injection token in a test instance
          provide: getRepositoryToken(Bizcase),
          // as a class value, Repository needs no generics
          useClass: Repository,
        },
        // BizcaseService,
      ],
    }).compile();

    bizcaseService = module.get<BizcaseService>(BizcaseService);
    // Save the instance of the repository and set the correct generics
    bizcaseRepository = module.get<Repository<Bizcase>>(getRepositoryToken(Bizcase));
  });

  it('should be defined', () => {
    expect(bizcaseService).toBeDefined();
  });

  /*
  describe('findAll', () => {
    it.only('should return an array of bizcases', async () => {
      jest.spyOn(bizcaseRepository, 'find').mockResolvedValueOnce(data);

      expect(await bizcaseService.findAll({})).toBe(data);
    });
  });
  describe('findAllPagination', () => {
    it('should return a pagination of bizcases', async () => {
      const count = data.length;
      const result: [Bizcase[], number] = [data, count];
      jest
        .spyOn(bizcaseService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.findAllPagination({}, user)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bizcase by id', async () => {
      const id = 1;
      const result = data.find(bc => bc.id === id);
      jest.spyOn(bizcaseService, 'findOneById').mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a bizcase', async () => {
      const inputData = {
        title: 'Bizcase created',
        templateId: 10,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(bizcaseService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.create(inputData, user)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a bizcase', async () => {
      const id = 1;
      const inputData = data.find(bc => bc.id === id);
      const result = { ...inputData };
      jest.spyOn(bizcaseService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many bizcases', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(bizcaseService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a bizcase', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(bizcaseService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await bizcasesController.remove(id)).toBe(result);
    });
  });
  */
});

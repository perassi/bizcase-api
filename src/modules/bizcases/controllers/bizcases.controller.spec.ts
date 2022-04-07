// import { Test } from '@nestjs/testing';
import { Repository, Connection } from 'typeorm';

import { User } from 'modules/users/entities';
import { Bizcase } from '../entities/bizcase.entity';
import { BizcaseService } from '../services/bizcase.service';

import { BizcaseController } from './bizcases.controller';

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

describe('BizcaseController', () => {
  let bizcasesController: BizcaseController;
  let bizcaseService: BizcaseService;
  let bizcaseRepository: Repository<Bizcase>;
  let connection: Connection;

  beforeEach(async () => {
    /*
    const moduleRef = await Test.createTestingModule({
      controllers: [BizcaseController],
      providers: [BizcaseService],
    }).compile();

    bizcaseService = moduleRef.get<BizcaseService>(BizcaseService);
    bizcasesController = moduleRef.get<BizcaseController>(BizcaseController);
    */
    bizcaseService = new BizcaseService(bizcaseRepository, connection);
    bizcasesController = new BizcaseController(bizcaseService);
  });

  describe('findAll', () => {
    it('should return an array of bizcases', async () => {
      jest.spyOn(bizcaseService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await bizcasesController.findAll({}, user)).toBe(data);
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
});

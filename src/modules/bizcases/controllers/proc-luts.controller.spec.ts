// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { User } from 'modules/users/entities';
import { ProcLut } from '../entities/proc-lut.entity';
import { ProcLutService } from '../services/proc-lut.service';

import { ProcLutController } from './proc-luts.controller';

const data: ProcLut[] = [
  {
    name: 'ProcLut 1',
    proc: 'proc',
    comment: 'test',
    id: 1,
  },
  {
    name: 'ProcLut 2',
    proc: 'proc',
    comment: 'test',
    id: 2,
  },
  {
    name: 'ProcLut 3',
    proc: 'proc',
    comment: 'test',
    id: 3,
  },
];

describe('ProcLutController', () => {
  let procLutsController: ProcLutController;
  let procLutService: ProcLutService;
  const procLutRepository: Repository<ProcLut> = new Repository<ProcLut>();

  beforeEach(async () => {
    procLutService = new ProcLutService(procLutRepository);
    procLutsController = new ProcLutController(procLutService);
  });

  describe('findAll', () => {
    it('should return an array of procLuts', async () => {
      jest.spyOn(procLutService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await procLutsController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of procLuts', async () => {
      const count = data.length;
      const result: [ProcLut[], number] = [data, count];
      jest
        .spyOn(procLutService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a procLut by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(procLutService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a procLut', async () => {
      const inputData = {
        name: 'ProcLut created',
        proc: 'test',
        comment: 'comment',
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(procLutService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a procLut', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(procLutService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many procLuts', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(procLutService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a procLut', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(procLutService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await procLutsController.remove(id)).toBe(result);
    });
  });
});

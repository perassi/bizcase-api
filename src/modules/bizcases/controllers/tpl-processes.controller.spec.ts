// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { TplProcess } from '../entities/tpl-process.entity';
import { TplProcessService } from '../services/tpl-process.service';

import { TplProcessController } from './tpl-processes.controller';

const data: TplProcess[] = [
  {
    bcTemplateId: 1,
    procLutId: 1,
    meta: { test: true },
    id: 1,
  },
  {
    bcTemplateId: 2,
    procLutId: 1,
    meta: { test: true },
    id: 2,
  },
  {
    bcTemplateId: 1,
    procLutId: 2,
    meta: { test: true },
    id: 3,
  },
];

describe('TplProcessController', () => {
  let tplProcesssController: TplProcessController;
  let tplProcessService: TplProcessService;
  let tplProcessRepository: Repository<TplProcess>;

  beforeEach(async () => {
    tplProcessService = new TplProcessService(tplProcessRepository);
    tplProcesssController = new TplProcessController(tplProcessService);
  });

  describe('findAll', () => {
    it('should return an array of tplProcesss', async () => {
      jest.spyOn(tplProcessService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await tplProcesssController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of tplProcesss', async () => {
      const count = data.length;
      const result: [TplProcess[], number] = [data, count];
      jest
        .spyOn(tplProcessService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a tplProcess by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(tplProcessService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a tplProcess', async () => {
      const inputData = {
        bcTemplateId: 1,
        procLutId: 1,
        meta: { test: true },
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(tplProcessService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a tplProcess', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(tplProcessService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many tplProcesss', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(tplProcessService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a tplProcess', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(tplProcessService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await tplProcesssController.remove(id)).toBe(result);
    });
  });
});

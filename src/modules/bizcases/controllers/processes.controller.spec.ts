import { Repository } from 'typeorm';

import { Process } from '../entities/process.entity';
import { ProcessService } from '../services/process.service';

import { ProcessController } from './processes.controller';

const data: Process[] = [
  {
    bcId: 1,
    procLutId: 1,
    data: { test: true },
    kpiId: null,
    id: 1,
  },
  {
    bcId: 2,
    procLutId: 1,
    data: { test: true },
    kpiId: null,
    id: 2,
  },
  {
    bcId: 1,
    procLutId: 2,
    data: { test: true },
    kpiId: null,
    id: 3,
  },
];

describe('ProcessController', () => {
  let processsController: ProcessController;
  let processService: ProcessService;
  let processRepository: Repository<Process>;

  beforeEach(async () => {
    processService = new ProcessService(processRepository);
    processsController = new ProcessController(processService);
  });

  describe('findAll', () => {
    it('should return an array of processs', async () => {
      jest.spyOn(processService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await processsController.findAll(1)).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of processs', async () => {
      const count = data.length;
      const result: [Process[], number] = [data, count];
      jest
        .spyOn(processService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await processsController.findAllPagination(1)).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a process by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(processService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await processsController.findOne(1, 1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a process', async () => {
      const inputData = {
        bcId: 1,
        procLutId: 1,
        data: { test: true },
        kpiId: null,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(processService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await processsController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a process', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(processService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await processsController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many processs', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(processService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await processsController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a process', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(processService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await processsController.remove(id)).toBe(result);
    });
  });
});

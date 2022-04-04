// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { Resource } from '../entities/resource.entity';
import { ResourceService } from '../services/resource.service';

import { ResourceController } from './resources.controller';

const data: Resource[] = [
  {
    opt: 'text',
    expPectFees: 3,
    projStartDt: new Date(),
    projEndDt: new Date(),
    resType: 'test',
    tcoId: 3,
    id: 1,
  },
  {
    opt: 'text',
    expPectFees: 3,
    projStartDt: new Date(),
    projEndDt: new Date(),
    resType: 'test',
    tcoId: 3,
    id: 2,
  },
  {
    opt: 'text',
    expPectFees: 3,
    projStartDt: new Date(),
    projEndDt: new Date(),
    resType: 'test',
    tcoId: 3,
    id: 3,
  },
];

describe('ResourceController', () => {
  let resourcesController: ResourceController;
  let resourceService: ResourceService;
  let resourceRepository: Repository<Resource>;

  beforeEach(async () => {
    resourceService = new ResourceService(resourceRepository);
    resourcesController = new ResourceController(resourceService);
  });

  describe('findAll', () => {
    it('should return an array of resources', async () => {
      jest.spyOn(resourceService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await resourcesController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of resources', async () => {
      const count = data.length;
      const result: [Resource[], number] = [data, count];
      jest
        .spyOn(resourceService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a resource by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(resourceService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a resource', async () => {
      const inputData = {
        opt: 'text',
        expPectFees: 3,
        projStartDt: new Date(),
        projEndDt: new Date(),
        resType: 'test',
        tcoId: 3,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(resourceService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a resource', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(resourceService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many resources', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(resourceService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a resource', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(resourceService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await resourcesController.remove(id)).toBe(result);
    });
  });
});

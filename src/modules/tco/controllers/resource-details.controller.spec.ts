// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ResourceDetail } from '../entities/resource-detail.entity';
import { ResourceDetailService } from '../services/resource-detail.service';

import { ResourceDetailController } from './resource-details.controller';

const data: ResourceDetail[] = [
  {
    resourceId: 1,
    name: 'test',
    costRate: 3,
    estHrs: 3,
    tot: 3,
    yr1Hrs: 3,
    yr2Hrs: 3,
    yr3Hrs: 3,
    id: 1,
  },
  {
    resourceId: 1,
    name: 'test',
    costRate: 3,
    estHrs: 3,
    tot: 3,
    yr1Hrs: 3,
    yr2Hrs: 3,
    yr3Hrs: 3,
    id: 2,
  },
  {
    resourceId: 1,
    name: 'test',
    costRate: 3,
    estHrs: 3,
    tot: 3,
    yr1Hrs: 3,
    yr2Hrs: 3,
    yr3Hrs: 3,
    id: 3,
  },
];

describe('ResourceDetailController', () => {
  let resourceDetailsController: ResourceDetailController;
  let resourceDetailService: ResourceDetailService;
  let resourceDetailRepository: Repository<ResourceDetail>;

  beforeEach(async () => {
    resourceDetailService = new ResourceDetailService(resourceDetailRepository);
    resourceDetailsController = new ResourceDetailController(resourceDetailService);
  });

  describe('findAll', () => {
    it('should return an array of resourceDetails', async () => {
      jest.spyOn(resourceDetailService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await resourceDetailsController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of resourceDetails', async () => {
      const count = data.length;
      const result: [ResourceDetail[], number] = [data, count];
      jest
        .spyOn(resourceDetailService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a resourceDetail by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(resourceDetailService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a resourceDetail', async () => {
      const inputData = {
        resourceId: 1,
        name: 'test',
        costRate: 3,
        estHrs: 3,
        tot: 3,
        yr1Hrs: 3,
        yr2Hrs: 3,
        yr3Hrs: 3,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(resourceDetailService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a resourceDetail', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(resourceDetailService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many resourceDetails', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(resourceDetailService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a resourceDetail', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(resourceDetailService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await resourceDetailsController.remove(id)).toBe(result);
    });
  });
});

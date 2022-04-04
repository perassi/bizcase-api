// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { OtherCostOpt } from '../entities/other-cost-opt.entity';
import { OtherCostOptService } from '../services/other-cost-opt.service';

import { OtherCostOptController } from './other-cost-opts.controller';

const data: OtherCostOpt[] = [
  {
    item: 'test',
    costType: 'test',
    yr1Cost: 3,
    yr2Cost: 3,
    yr3Cost: 3,
    yr4Cost: 3,
    yr5Cost: 3,
    tcoId: 3,
    id: 1,
  },
  {
    item: 'test',
    costType: 'test',
    yr1Cost: 3,
    yr2Cost: 3,
    yr3Cost: 3,
    yr4Cost: 3,
    yr5Cost: 3,
    tcoId: 3,
    id: 2,
  },
  {
    item: 'test',
    costType: 'test',
    yr1Cost: 3,
    yr2Cost: 3,
    yr3Cost: 3,
    yr4Cost: 3,
    yr5Cost: 3,
    tcoId: 3,
    id: 3,
  },
];

describe('OtherCostOptController', () => {
  let otherCostOptsController: OtherCostOptController;
  let otherCostOptService: OtherCostOptService;
  let otherCostOptRepository: Repository<OtherCostOpt>;

  beforeEach(async () => {
    otherCostOptService = new OtherCostOptService(otherCostOptRepository);
    otherCostOptsController = new OtherCostOptController(otherCostOptService);
  });

  describe('findAll', () => {
    it('should return an array of otherCostOpts', async () => {
      jest.spyOn(otherCostOptService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await otherCostOptsController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of otherCostOpts', async () => {
      const count = data.length;
      const result: [OtherCostOpt[], number] = [data, count];
      jest
        .spyOn(otherCostOptService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a otherCostOpt by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(otherCostOptService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a otherCostOpt', async () => {
      const inputData = {
        item: 'test',
        costType: 'test',
        yr1Cost: 3,
        yr2Cost: 3,
        yr3Cost: 3,
        yr4Cost: 3,
        yr5Cost: 3,
        tcoId: 3,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(otherCostOptService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a otherCostOpt', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(otherCostOptService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many otherCostOpts', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(otherCostOptService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a otherCostOpt', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(otherCostOptService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await otherCostOptsController.remove(id)).toBe(result);
    });
  });
});

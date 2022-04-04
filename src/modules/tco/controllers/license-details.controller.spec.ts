// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { LicenseDetail } from '../entities/license-detail.entity';
import { LicenseDetailService } from '../services/license-detail.service';

import { LicenseDetailController } from './license-details.controller';

const data: LicenseDetail[] = [
  {
    name: 'test',
    count: 3,
    costType: 'test',
    cost: 3,
    totCost: 3,
    annuSptPect: 3,
    annuSptCost: 3,
    licenseId: 1,
    id: 1,
  },
  {
    name: 'test',
    count: 3,
    costType: 'test',
    cost: 3,
    totCost: 3,
    annuSptPect: 3,
    annuSptCost: 3,
    licenseId: 1,
    id: 2,
  },
  {
    name: 'test',
    count: 3,
    costType: 'test',
    cost: 3,
    totCost: 3,
    annuSptPect: 3,
    annuSptCost: 3,
    licenseId: 1,
    id: 3,
  },
];

describe('LicenseDetailController', () => {
  let licenseDetailsController: LicenseDetailController;
  let licenseDetailService: LicenseDetailService;
  let licenseDetailRepository: Repository<LicenseDetail>;

  beforeEach(async () => {
    licenseDetailService = new LicenseDetailService(licenseDetailRepository);
    licenseDetailsController = new LicenseDetailController(licenseDetailService);
  });

  describe('findAll', () => {
    it('should return an array of licenseDetails', async () => {
      jest.spyOn(licenseDetailService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await licenseDetailsController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of licenseDetails', async () => {
      const count = data.length;
      const result: [LicenseDetail[], number] = [data, count];
      jest
        .spyOn(licenseDetailService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a licenseDetail by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(licenseDetailService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a licenseDetail', async () => {
      const inputData = {
        name: 'test',
        count: 3,
        costType: 'test',
        cost: 3,
        totCost: 3,
        annuSptPect: 3,
        annuSptCost: 3,
        licenseId: 1,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(licenseDetailService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a licenseDetail', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(licenseDetailService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many licenseDetails', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(licenseDetailService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a licenseDetail', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(licenseDetailService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await licenseDetailsController.remove(id)).toBe(result);
    });
  });
});

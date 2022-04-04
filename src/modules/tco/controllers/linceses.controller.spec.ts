// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { License } from '../entities/license.entity';
import { LicenseService } from '../services/license.service';

import { LicenseController } from './licenses.controller';

const data: License[] = [
  {
    vendor: 'LLC',
    vendorSol: 'test',
    opt: 'test',
    discountPct: 4,
    annuIncrPct: 3,
    tcoId: 1,
    id: 1,
  },
  {
    vendor: 'LLC',
    vendorSol: 'test',
    opt: 'test',
    discountPct: 4,
    annuIncrPct: 3,
    tcoId: 1,
    id: 2,
  },
  {
    vendor: 'LLC',
    vendorSol: 'test',
    opt: 'test',
    discountPct: 4,
    annuIncrPct: 3,
    tcoId: 1,
    id: 3,
  },
];

describe('LicenseController', () => {
  let licensesController: LicenseController;
  let licenseService: LicenseService;
  let licenseRepository: Repository<License>;

  beforeEach(async () => {
    licenseService = new LicenseService(licenseRepository);
    licensesController = new LicenseController(licenseService);
  });

  describe('findAll', () => {
    it('should return an array of licenses', async () => {
      jest.spyOn(licenseService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await licensesController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of licenses', async () => {
      const count = data.length;
      const result: [License[], number] = [data, count];
      jest
        .spyOn(licenseService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a license by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(licenseService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a license', async () => {
      const inputData = {
        vendor: 'LLC',
        vendorSol: 'test',
        opt: 'test',
        discountPct: 4,
        annuIncrPct: 3,
        tcoId: 1,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(licenseService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a license', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(licenseService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many licenses', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(licenseService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a license', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(licenseService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await licensesController.remove(id)).toBe(result);
    });
  });
});

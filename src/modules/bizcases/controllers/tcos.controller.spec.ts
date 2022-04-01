// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { Tco } from '../entities/tco.entity';
import { TcoService } from '../services/tco.service';

import { TcoController } from './tcos.controller';

const data: Tco[] = [
  {
    bcId: 1,
    optNumber: 4,
    parmIntRate: 4,
    parmTaxRate: 4,
    parmPrepaidAssetYrs: 4,
    parmFixedAssetYrs: 4,
    parmCcy: 'USD',
    parmClientCcy: 'USD',
    parmCcyRate: 4,
    id: 1,
  },
  {
    bcId: 1,
    optNumber: 4,
    parmIntRate: 4,
    parmTaxRate: 4,
    parmPrepaidAssetYrs: 4,
    parmFixedAssetYrs: 4,
    parmCcy: 'USD',
    parmClientCcy: 'USD',
    parmCcyRate: 4,
    id: 2,
  },
  {
    bcId: 1,
    optNumber: 4,
    parmIntRate: 4,
    parmTaxRate: 4,
    parmPrepaidAssetYrs: 4,
    parmFixedAssetYrs: 4,
    parmCcy: 'USD',
    parmClientCcy: 'USD',
    parmCcyRate: 4,
    id: 3,
  },
];

describe('TcoController', () => {
  let tcosController: TcoController;
  let tcoService: TcoService;
  let tcoRepository: Repository<Tco>;

  beforeEach(async () => {
    tcoService = new TcoService(tcoRepository);
    tcosController = new TcoController(tcoService);
  });

  describe('findAll', () => {
    it('should return an array of tcos', async () => {
      jest.spyOn(tcoService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await tcosController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of tcos', async () => {
      const count = data.length;
      const result: [Tco[], number] = [data, count];
      jest
        .spyOn(tcoService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a tco by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(tcoService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a tco', async () => {
      const inputData = {
        bcId: 1,
        optNumber: 4,
        parmIntRate: 4,
        parmTaxRate: 4,
        parmPrepaidAssetYrs: 4,
        parmFixedAssetYrs: 4,
        parmCcy: 'USD',
        parmClientCcy: 'USD',
        parmCcyRate: 4,
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(tcoService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.create(inputData)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a tco', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(tcoService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many tcos', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(tcoService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a tco', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(tcoService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await tcosController.remove(id)).toBe(result);
    });
  });
});

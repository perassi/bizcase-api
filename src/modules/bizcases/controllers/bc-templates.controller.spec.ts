// import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { User } from 'modules/users/entities';
import { BcTemplate } from '../entities/template.entity';
import { BcTemplateService } from '../services/template.service';

import { BcTemplateController } from './bc-templates.controller';

const data: BcTemplate[] = [
  {
    name: 'BcTemplate 1',
    userId: 1,
    description: null,
    id: 1,
  },
  {
    name: 'BcTemplate 2',
    userId: 1,
    description: null,
    id: 2,
  },
  {
    name: 'BcTemplate 3',
    userId: 1,
    description: null,
    id: 3,
  },
];

const user: User = {
  id: 1,
  email: 't@t.com',
  isActive: true,
};

describe('BcTemplateController', () => {
  let bcTemplatesController: BcTemplateController;
  let bcTemplateService: BcTemplateService;
  const bcTemplateRepository: Repository<BcTemplate> = null;

  beforeEach(async () => {
    bcTemplateService = new BcTemplateService(bcTemplateRepository);
    bcTemplatesController = new BcTemplateController(bcTemplateService);
  });

  describe('findAll', () => {
    it('should return an array of bcTemplates', async () => {
      jest.spyOn(bcTemplateService, 'findAll').mockImplementation(() => Promise.resolve(data));

      expect(await bcTemplatesController.findAll()).toBe(data);
    });
  });

  describe('findAllPagination', () => {
    it('should return a pagination of bcTemplates', async () => {
      const count = data.length;
      const result: [BcTemplate[], number] = [data, count];
      jest
        .spyOn(bcTemplateService, 'findAllPagination')
        .mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.findAllPagination()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bcTemplate by id', async () => {
      const id = 1;
      const result = data.find(bct => bct.id === id);
      jest
        .spyOn(bcTemplateService, 'findOneById')
        .mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.findOne(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a bcTemplate', async () => {
      const inputData = {
        name: 'BcTemplate created',
        description: 'description',
      };
      const result = { ...inputData, id: 100 };
      jest.spyOn(bcTemplateService, 'create').mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.create(inputData, user)).toBe(result);
    });
  });

  describe('save', () => {
    it('should save a bcTemplate', async () => {
      const id = 1;
      const inputData = data.find(bct => bct.id === id);
      const result = { ...inputData };
      jest.spyOn(bcTemplateService, 'save').mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.save(id, inputData)).toBe(result);
    });
  });

  describe('saveMany', () => {
    it('should save many bcTemplates', async () => {
      const inputData = data.slice(0, 2);
      const result = { ...data };
      jest.spyOn(bcTemplateService, 'saveMany').mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.saveMany(inputData)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a bcTemplate', async () => {
      const id = 1;
      const result = { id };
      jest.spyOn(bcTemplateService, 'remove').mockImplementation(() => Promise.resolve(result));

      expect(await bcTemplatesController.remove(id)).toBe(result);
    });
  });
});

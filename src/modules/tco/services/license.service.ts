import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { License } from '../entities';
import { LicenseCreationInput, LicenseInput, LicensesArgs } from '../dto';

@Injectable()
export class LicenseService extends BaseService {
  constructor(@InjectRepository(License) private readonly licenseRepository: Repository<License>) {
    super();
  }

  async findAll(args: LicensesArgs): Promise<License[]> {
    return await this.licenseRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: LicensesArgs): Promise<[License[], number]> {
    return await this.licenseRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<License> {
    return this.licenseRepository.findOne(id);
  }

  async create(data: LicenseCreationInput): Promise<License> {
    return await this.licenseRepository.save(this.licenseRepository.create(data));
  }

  async insertMany(data: LicenseCreationInput[]): Promise<License[]> {
    const result = await this.licenseRepository.save(data);
    return result;
  }

  async save(id: number, data: LicenseInput): Promise<License> {
    return this.licenseRepository.save({ ...data, id });
  }

  async saveMany(data: LicenseInput[]) {
    const result = await this.licenseRepository.save(data);
    return await this.licenseRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.licenseRepository.delete(id);
    return { id };
  }
}

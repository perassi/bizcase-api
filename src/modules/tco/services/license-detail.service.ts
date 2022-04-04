import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { LicenseDetail } from '../entities';
import { LicenseDetailCreationInput, LicenseDetailInput, LicenseDetailsArgs } from '../dto';

@Injectable()
export class LicenseDetailService extends BaseService {
  constructor(@InjectRepository(LicenseDetail) private readonly licenseDetailRepository: Repository<LicenseDetail>) {
    super();
  }

  async findAll(args: LicenseDetailsArgs): Promise<LicenseDetail[]> {
    return await this.licenseDetailRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: LicenseDetailsArgs): Promise<[LicenseDetail[], number]> {
    return await this.licenseDetailRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<LicenseDetail> {
    return this.licenseDetailRepository.findOne(id);
  }

  async create(data: LicenseDetailCreationInput): Promise<LicenseDetail> {
    return await this.licenseDetailRepository.save(this.licenseDetailRepository.create(data));
  }

  async insertMany(data: LicenseDetailCreationInput[]): Promise<LicenseDetail[]> {
    const result = await this.licenseDetailRepository.save(data);
    return result;
  }

  async save(id: number, data: LicenseDetailInput): Promise<LicenseDetail> {
    return this.licenseDetailRepository.save({ ...data, id });
  }

  async saveMany(data: LicenseDetailInput[]) {
    const result = await this.licenseDetailRepository.save(data);
    return await this.licenseDetailRepository.findByIds(result.map(item => item.id));
  }

  async remove(id: number) {
    await this.licenseDetailRepository.delete(id);
    return { id };
  }
}

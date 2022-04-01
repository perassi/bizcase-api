import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Bizcase } from '../entities';
import { BizcaseCreationInput, BizcaseInput, BizcasesArgs } from '../dto';

@Injectable()
export class BizcaseService extends BaseService {
  constructor(@InjectRepository(Bizcase) private readonly bizcaseRepository: Repository<Bizcase>) {
    super();
  }

  async findAll(args: BizcasesArgs): Promise<Bizcase[]> {
    return await this.bizcaseRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: BizcasesArgs): Promise<[Bizcase[], number]> {
    return await this.bizcaseRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<Bizcase> {
    return this.bizcaseRepository.findOne(id);
  }

  async findOneByTitle(title: string): Promise<Bizcase> {
    return this.bizcaseRepository.findOne({ title });
  }

  async create(data: BizcaseCreationInput): Promise<Bizcase> {
    if (await this.findOneByTitle(data.title)) {
      throw new HttpException('Title already exists', HttpStatus.BAD_REQUEST);
    }
    return await this.bizcaseRepository.save(this.bizcaseRepository.create(data));
  }

  async insertMany(data: BizcaseCreationInput[]): Promise<Bizcase[]> {
    const result = await this.bizcaseRepository.save(data);
    return await this.bizcaseRepository.findByIds(result.map(bc => bc.id));
  }

  async save(data: BizcaseInput): Promise<Bizcase> {
    return this.bizcaseRepository.save(data);
  }

  async saveMany(data: BizcaseInput[]) {
    const result = await this.bizcaseRepository.save(data);
    return await this.bizcaseRepository.findByIds(result.map(bc => bc.id));
  }

  async remove(id: number) {
    await this.bizcaseRepository.delete(id);
    return { id };
  }
}

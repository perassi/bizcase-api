import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { KpiLib } from '../entities';
import { KpiLibsArgs } from '../dto';

@Injectable()
export class KpiLibService extends BaseService {

  constructor(@InjectRepository(KpiLib, 'kpiConnection') private readonly kpiLibRepository: Repository<KpiLib>) {
    super();
  }

  async findAll(args: KpiLibsArgs): Promise<KpiLib[]> {
    return await this.kpiLibRepository.find(this.getFindAllQuery(args));
  }

  async findAllPagination(args: KpiLibsArgs): Promise<[KpiLib[], number]> {
    return await this.kpiLibRepository.findAndCount(this.getFindAllQuery(args));
  }

  async findOneById(id: number): Promise<KpiLib> {
    return this.kpiLibRepository.findOne(id);
  }
}

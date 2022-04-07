import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { BaseService } from 'modules/common/services';

import { Bizcase } from '../entities';
import { BizcaseCreationInput, BizcaseInput, BizcasesArgs } from '../dto';

import { User } from 'modules/users/entities';
import { Tco } from 'modules/tco/entities';

@Injectable()
export class BizcaseService extends BaseService {
  constructor(@InjectRepository(Bizcase) private readonly bizcaseRepository: Repository<Bizcase>,
              private readonly connection: Connection) {
    super();
  }

  async findAll(args: BizcasesArgs, currentUser: User): Promise<Bizcase[]> {
    const query = this.getFindAllQuery(args);

    // const bizcases =  this.bizcaseRepository.createQueryBuilder('bizcases')
    //   .leftJoinAndSelect('bizcases.sharedUsers', 'user')
    //   .select(['bizcases.id', 'bizcases.userId', 'user.id'])
    //   .where([{
    //       userId: currentUser.id,
    //       ...query.where,
    //     }, {
    //       'user.id': currentUser.id,
    //       ...query.where,
    //     }])
    //   .getMany();

    // return await this.bizcaseRepository.find({
    //   ...query,
    //   relations: ['sharedUsers'],
    //   where: [{
    //     userId: currentUser.id,
    //     ...query.where,
    //   }, {
    //     'sharedUsers.id': currentUser.id,
    //     ...query.where,
    //   }],
    // });

    return this.bizcaseRepository.find(query);
  }

  async findAllPagination(args: BizcasesArgs, currentUser: User): Promise<[Bizcase[], number]> {
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

  async clone(id: number): Promise<Bizcase> {
    const bizcase = await this.bizcaseRepository.findOne(id, {
      relations: ['tcos', 'tcos.otherCostOpts', 'tcos.resources', 'tcos.resources.resourceDetails', 'tcos.licenses', 'tcos.licenses.licenseDetails', 'processes'],
    });

    await this.connection.transaction(async transactionalEntityManager => {

      delete bizcase.id;
      bizcase.title = bizcase.title + '_cloned';
      if (await this.findOneByTitle(bizcase.title)) {
        throw new HttpException(`Title already exists: ${bizcase.title}`, HttpStatus.BAD_REQUEST);
      }

      const otherCostOpts = bizcase.tcos.reduce((t1, t2) => t1.concat(t2.otherCostOpts), []);
      otherCostOpts.forEach(item => delete item.id);
      await transactionalEntityManager.save(otherCostOpts);

      let resourceDetails = [];
      bizcase.tcos.forEach(tco => {
        tco.resources.forEach(res => {
          resourceDetails = resourceDetails.concat(res.resourceDetails);
        });
      });
      resourceDetails.forEach(item => delete item.id);
      await transactionalEntityManager.save(resourceDetails);

      let resources = [];
      bizcase.tcos.forEach(tco => {
        resources = resources.concat(tco.resources);
      });
      resources.forEach(item => delete item.id);
      await transactionalEntityManager.save(resources);

      let licenseDetails = [];
      bizcase.tcos.forEach(tco => {
        tco.licenses.forEach(res => {
          licenseDetails = licenseDetails.concat(res.licenseDetails);
        });
      });
      licenseDetails.forEach(item => delete item.id);
      await transactionalEntityManager.save(licenseDetails);

      let licenses = [];
      bizcase.tcos.forEach(tco => {
        licenses = licenses.concat(tco.licenses);
      });
      licenses.forEach(item => delete item.id);
      await transactionalEntityManager.save(licenses);

      bizcase.tcos.forEach(item => delete item.id);
      await transactionalEntityManager.save(bizcase.tcos);

      bizcase.processes.forEach(item => delete item.id);
      await transactionalEntityManager.save(bizcase.processes);

      await transactionalEntityManager.save(bizcase);

    });
    return bizcase;
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

  async removeSharedUsers(id: number, userIds: number[]) {
    const bizcase = await this.bizcaseRepository.findOne(id, { relations: ['sharedUsers'] });

    bizcase.sharedUsers = bizcase.sharedUsers.filter(user => userIds.indexOf(user.id) === -1);

    await this.bizcaseRepository.save(bizcase);

    bizcase.sharedUsers = bizcase.sharedUsers.map(user => new User({ id: user.id }));
    return bizcase;
  }

  async addSharedUsers(id: number, userIds: number[]) {
    const bizcase = await this.bizcaseRepository.findOne(id, { relations: ['sharedUsers'] });

    userIds.forEach(userId => {
      if (bizcase.sharedUsers.map(user => user.id).indexOf(userId) === -1) {
        bizcase.sharedUsers.push(new User({ id: userId }));
      }
    });

    await this.bizcaseRepository.save(bizcase);

    bizcase.sharedUsers = bizcase.sharedUsers.map(user => new User({ id: user.id }));
    return bizcase;

  }

  async remove(id: number) {
    await this.bizcaseRepository.delete(id);
    return { id };
  }
}

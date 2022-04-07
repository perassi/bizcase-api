import { Injectable, CanActivate, ExecutionContext, Inject, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Bizcase } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class BizcaseGuard implements CanActivate {
  constructor(private reflector: Reflector,
              @InjectRepository(Bizcase) private readonly bizcaseRepository: Repository<Bizcase>) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bizcaseId = request.params.bizcaseId;

    if (isNaN(bizcaseId)) {
      throw new BadRequestException(`Bizcase Id should be valid.`);
    }
    const bizcase = await this.bizcaseRepository.findOne(bizcaseId, {
      relations: ['sharedUsers'],
    });

    if (!bizcase) {
      throw new NotFoundException(`Bizcase ${bizcaseId} is not found`);
    }

    // const bizcase = await this.bizcaseRepository.createQueryBuilder('bizcases')
    //   .where({ id: 1 })
    //   .leftJoinAndSelect('bizcases.sharedUsers', 'user')
    //   .select(['bizcases.id', ''bizcases.userId', 'user.id'])
    //   .getMany();

    const allUsers = [bizcase.userId, ...bizcase.sharedUsers.map(user => user.id)];

    const currentUser = request.user;
    if (allUsers.indexOf(currentUser.id) === -1) {
      throw new UnauthorizedException(`You don't have permission to access Bizcase: ${bizcaseId}`);
    }
    request.bizcase = bizcase;
    return true;
  }
}

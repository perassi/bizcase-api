
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  Repository,
} from 'typeorm';
import { ProcessCreationInput } from '../dto';
import { Bizcase, TplProcess, BcTemplate, Process } from '../entities';
import { BizcaseService, BcTemplateService, TplProcessService, ProcessService } from '../services';
import { HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@EventSubscriber()
export class BizcaseSubscriber implements EntitySubscriberInterface<Bizcase> {
  constructor(connection: Connection,
              private readonly processService: ProcessService,
              private readonly bcTemplateService: BcTemplateService,
              private readonly tplProcessService: TplProcessService,
              @InjectRepository(BcTemplate) private readonly bcTemplateRepository: Repository<BcTemplate>) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Bizcase;
  }

  async afterInsert(event: InsertEvent<Bizcase>) {
    await this.createProcesses(event.entity);
  }

  async createProcesses(bizcase: Bizcase) {
    const template = await this.bcTemplateRepository.findOne({
      where: {
        id: bizcase.templateId,
      },
      relations: ['tplProcesses'],
    });

    const newProcesses: ProcessCreationInput[] = [];
    template.tplProcesses.map(tplProc => {
      newProcesses.push({
        bcId: bizcase.id,
        procLutId: tplProc.procLutId,
        kpiId: tplProc.kpiId,
        data: {},
      });
    });
    await this.processService.insertMany(newProcesses);
  }
}

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ProcessService } from '../services';
import { ProcessInput, ProcessCreationInput, ProcessArgs } from '../dto';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('processes')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get('')
  async findAll(@Query() args?: ProcessArgs) {
    return this.processService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: ProcessArgs) {
    return this.processService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.processService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: ProcessCreationInput) {
    return this.processService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: ProcessCreationInput[]) {
    return this.processService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ProcessInput) {
    return this.processService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: ProcessInput[]) {
    return this.processService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.processService.remove(id);
  }
}

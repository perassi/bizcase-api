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
import { ApiTags, ApiBearerAuth, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';

import { ProcessService } from '../services';
import { ProcessInput, ProcessCreationInput, ProcessArgs } from '../dto';

@ApiBearerAuth()
@ApiTags('processes')
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

  @ApiBody({ type: [ProcessCreationInput] })
  @Post('/insert-many')
  async insertMany(@Body() data: ProcessCreationInput[]) {
    return this.processService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ProcessInput) {
    return this.processService.save(id, data);
  }

  @ApiBody({ type: [ProcessInput] })
  @Post('/save-many')
  async saveMany(@Body() data: ProcessInput[]) {
    return this.processService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.processService.remove(id);
  }
}

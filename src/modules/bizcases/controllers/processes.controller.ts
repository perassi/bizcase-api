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

import { BizcaseGuard } from '../guards';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/processes')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/processes')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Param('bizcaseId', new ParseIntPipe()) bizcaseId: number,
                @Query() args?: ProcessArgs) {
    return this.processService.findAll({ ...args }, bizcaseId);
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Param('bizcaseId', new ParseIntPipe()) bizcaseId: number,
                          @Query() args?: ProcessArgs) {
    return this.processService.findAllPagination({ ...args }, bizcaseId);
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('bizcaseId', new ParseIntPipe()) bizcaseId: number,
                @Param('id', new ParseIntPipe()) id: number) {
    return this.processService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: ProcessCreationInput) {
    return this.processService.create({ ...data });
  }

  @ApiBody({ type: [ProcessCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: ProcessCreationInput[]) {
    return this.processService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ProcessInput) {
    return this.processService.save(id, data);
  }

  @ApiBody({ type: [ProcessInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: ProcessInput[]) {
    return this.processService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.processService.remove(id);
  }
}

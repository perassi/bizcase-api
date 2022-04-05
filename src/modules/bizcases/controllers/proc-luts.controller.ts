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
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from 'modules/common/decorators';
import { User } from 'modules/users/entities';

import { ProcLutService } from '../services';
import { ProcLutInput, ProcLutCreationInput, ProcLutsArgs } from '../dto';

@ApiTags('proc-luts')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('proc-luts')
export class ProcLutController {
  constructor(private readonly procLutService: ProcLutService) {}

  @Get('')
  async findAll(@Query() args?: ProcLutsArgs) {
    return this.procLutService.findAll(args);
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: ProcLutsArgs) {
    return this.procLutService.findAllPagination(args);
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.procLutService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: ProcLutCreationInput) {
    return this.procLutService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: ProcLutCreationInput[]) {
    return this.procLutService.insertMany(data.map(item => ({ ...item })));
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ProcLutInput) {
    return this.procLutService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: ProcLutInput[]) {
    return this.procLutService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.procLutService.remove(id);
  }
}

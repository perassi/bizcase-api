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

import { TplProcessService } from '../services';
import { TplProcessInput, TplProcessCreationInput, TplProcessArgs } from '../dto';

@ApiTags('tpl-processes')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tpl-processes')
export class TplProcessController {
  constructor(private readonly tplProcessService: TplProcessService) {}

  @Get('')
  async findAll(@Query() args?: TplProcessArgs) {
    return this.tplProcessService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: TplProcessArgs) {
    return this.tplProcessService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tplProcessService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: TplProcessCreationInput) {
    return this.tplProcessService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: TplProcessCreationInput[]) {
    return this.tplProcessService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: TplProcessInput) {
    return this.tplProcessService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: TplProcessInput[]) {
    return this.tplProcessService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tplProcessService.remove(id);
  }
}

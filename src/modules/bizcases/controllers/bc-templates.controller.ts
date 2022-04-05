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

import { BcTemplateService } from '../services';
import { BcTemplateInput, BcTemplateCreationInput, BcTemplatesArgs } from '../dto';

@ApiTags('bc-templates')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bc-templates')
export class BcTemplateController {
  constructor(private readonly bcTemplateService: BcTemplateService) {}

  @Get('')
  async findAll(@Query() args?: BcTemplatesArgs) {
    return this.bcTemplateService.findAll(args);
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: BcTemplatesArgs) {
    return this.bcTemplateService.findAllPagination(args);
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.bcTemplateService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: BcTemplateCreationInput, @CurrentUser() user: User) {
    return this.bcTemplateService.create({ ...data, userId: user.id });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: BcTemplateCreationInput[], @CurrentUser() user: User) {
    return this.bcTemplateService.insertMany(data.map(bct => ({ ...bct, userId: user.id })));
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: BcTemplateInput) {
    return this.bcTemplateService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: BcTemplateInput[]) {
    return this.bcTemplateService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.bcTemplateService.remove(id);
  }
}

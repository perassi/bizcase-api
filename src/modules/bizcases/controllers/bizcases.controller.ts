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

import { BizcaseService } from '../services';
import { BizcaseInput, BizcaseCreationInput, BizcasesArgs } from '../dto';

@ApiTags('bizcases')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases')
export class BizcaseController {
  constructor(private readonly bizcaseService: BizcaseService) {}

  @Get('')
  async findAll(@Query() args?: BizcasesArgs, @CurrentUser() user?: User) {
    return this.bizcaseService.findAll({ ...args, userId: user.id });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: BizcasesArgs, @CurrentUser() user?: User) {
    return this.bizcaseService.findAllPagination({ ...args, userId: user.id });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: BizcaseCreationInput, @CurrentUser() user: User) {
    return this.bizcaseService.create({ ...data, userId: user.id });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: BizcaseCreationInput[], @CurrentUser() user: User) {
    return this.bizcaseService.insertMany(data.map(bc => ({ ...bc, userId: user.id })));
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: BizcaseInput) {
    return this.bizcaseService.save({ ...data, id });
  }

  @Post('/save-many')
  async saveMany(@Body() data: BizcaseInput[]) {
    return this.bizcaseService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.remove(id);
  }
}

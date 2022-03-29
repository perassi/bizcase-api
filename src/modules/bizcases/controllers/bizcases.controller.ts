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

import { CurrentUser } from 'modules/common/decorators';
import { User } from 'modules/users/entities';

import { BizcaseService } from '../services';
import { BizcaseInput, BizcaseCreationInput, BizcasesArgs } from '../dto';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases')
export class BizcaseController {
  constructor(private readonly bizcaseService: BizcaseService) {}

  @Get('')
  async findAll(@Query() args?: BizcasesArgs) {
    return this.bizcaseService.findAll(args);
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: BizcasesArgs) {
    return this.bizcaseService.findAllPagination(args);
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: BizcaseCreationInput, @CurrentUser() user: User) {
    return this.bizcaseService.create(data, user);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: BizcaseInput) {
    return this.bizcaseService.save(id, data);
  }

  @Post('/bulk')
  async saveMany(@Body() data: BizcaseInput[]) {
    return this.bizcaseService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.remove(id);
  }
}

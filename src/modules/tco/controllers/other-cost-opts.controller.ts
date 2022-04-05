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

import { OtherCostOptService } from '../services';
import { OtherCostOptInput, OtherCostOptCreationInput, OtherCostOptsArgs } from '../dto';

@ApiTags('other-cost-opts')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('other-cost-opts')
export class OtherCostOptController {
  constructor(private readonly otherCostOptService: OtherCostOptService) {}

  @Get('')
  async findAll(@Query() args?: OtherCostOptsArgs) {
    return this.otherCostOptService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: OtherCostOptsArgs) {
    return this.otherCostOptService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.otherCostOptService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: OtherCostOptCreationInput) {
    return this.otherCostOptService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: OtherCostOptCreationInput[]) {
    return this.otherCostOptService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: OtherCostOptInput) {
    return this.otherCostOptService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: OtherCostOptInput[]) {
    return this.otherCostOptService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.otherCostOptService.remove(id);
  }
}

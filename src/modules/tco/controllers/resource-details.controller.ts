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

import { ResourceDetailService } from '../services';
import { ResourceDetailInput, ResourceDetailCreationInput, ResourceDetailsArgs } from '../dto';

@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('resource-details')
export class ResourceDetailController {
  constructor(private readonly resourceDetailService: ResourceDetailService) {}

  @Get('')
  async findAll(@Query() args?: ResourceDetailsArgs) {
    return this.resourceDetailService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: ResourceDetailsArgs) {
    return this.resourceDetailService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceDetailService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: ResourceDetailCreationInput) {
    return this.resourceDetailService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: ResourceDetailCreationInput[]) {
    return this.resourceDetailService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ResourceDetailInput) {
    return this.resourceDetailService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: ResourceDetailInput[]) {
    return this.resourceDetailService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceDetailService.remove(id);
  }
}

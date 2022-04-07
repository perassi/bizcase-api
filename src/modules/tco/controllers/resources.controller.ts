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

import { CurrentUser } from 'modules/common/decorators';
import { User } from 'modules/users/entities';

import { ResourceService } from '../services';
import { ResourceInput, ResourceCreationInput, ResourcesArgs } from '../dto';

@ApiBearerAuth()
@ApiTags('resources')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('resources')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @Get('')
  async findAll(@Query() args?: ResourcesArgs) {
    return this.resourceService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: ResourcesArgs) {
    return this.resourceService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: ResourceCreationInput) {
    return this.resourceService.create({ ...data });
  }

  @ApiBody({ type: [ResourceCreationInput] })
  @Post('/insert-many')
  async insertMany(@Body() data: ResourceCreationInput[]) {
    return this.resourceService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ResourceInput) {
    return this.resourceService.save(id, data);
  }

  @ApiBody({ type: [ResourceInput] })
  @Post('/save-many')
  async saveMany(@Body() data: ResourceInput[]) {
    return this.resourceService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceService.remove(id);
  }
}

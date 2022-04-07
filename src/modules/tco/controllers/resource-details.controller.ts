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

import { ResourceDetailService } from '../services';
import { ResourceDetailInput, ResourceDetailCreationInput, ResourceDetailsArgs } from '../dto';

import { BizcaseGuard } from 'modules/bizcases/guards/bizcase.guard';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/tcos/:tcoId/resources/:resourceId/resource-details')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/tcos/:tcoId/resources/:resourceId/resource-details')
export class ResourceDetailController {
  constructor(private readonly resourceDetailService: ResourceDetailService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Query() args?: ResourceDetailsArgs) {
    return this.resourceDetailService.findAll({ ...args });
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Query() args?: ResourceDetailsArgs) {
    return this.resourceDetailService.findAllPagination({ ...args });
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceDetailService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: ResourceDetailCreationInput) {
    return this.resourceDetailService.create({ ...data });
  }

  @ApiBody({ type: [ResourceDetailCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: ResourceDetailCreationInput[]) {
    return this.resourceDetailService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: ResourceDetailInput) {
    return this.resourceDetailService.save(id, data);
  }

  @ApiBody({ type: [ResourceDetailInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: ResourceDetailInput[]) {
    return this.resourceDetailService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.resourceDetailService.remove(id);
  }
}

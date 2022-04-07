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

import { OtherCostOptService } from '../services';
import { OtherCostOptInput, OtherCostOptCreationInput, OtherCostOptsArgs } from '../dto';

import { BizcaseGuard } from 'modules/bizcases/guards/bizcase.guard';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/tcos/:tcoId/other-cost-opts')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/tcos/:tcoId/other-cost-opts')
export class OtherCostOptController {
  constructor(private readonly otherCostOptService: OtherCostOptService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Query() args?: OtherCostOptsArgs) {
    return this.otherCostOptService.findAll({ ...args });
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Query() args?: OtherCostOptsArgs) {
    return this.otherCostOptService.findAllPagination({ ...args });
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.otherCostOptService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: OtherCostOptCreationInput) {
    return this.otherCostOptService.create({ ...data });
  }

  @ApiBody({ type: [OtherCostOptCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: OtherCostOptCreationInput[]) {
    return this.otherCostOptService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: OtherCostOptInput) {
    return this.otherCostOptService.save(id, data);
  }

  @ApiBody({ type: [OtherCostOptInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: OtherCostOptInput[]) {
    return this.otherCostOptService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.otherCostOptService.remove(id);
  }
}

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

import { LicenseDetailService } from '../services';
import { LicenseDetailInput, LicenseDetailCreationInput, LicenseDetailsArgs } from '../dto';

@ApiTags('license-details')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('license-details')
export class LicenseDetailController {
  constructor(private readonly licenseDetailService: LicenseDetailService) {}

  @Get('')
  async findAll(@Query() args?: LicenseDetailsArgs) {
    return this.licenseDetailService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: LicenseDetailsArgs) {
    return this.licenseDetailService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseDetailService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: LicenseDetailCreationInput) {
    return this.licenseDetailService.create({ ...data });
  }

  @Post('/insert-many')
  async insertMany(@Body() data: LicenseDetailCreationInput[]) {
    return this.licenseDetailService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: LicenseDetailInput) {
    return this.licenseDetailService.save(id, data);
  }

  @Post('/save-many')
  async saveMany(@Body() data: LicenseDetailInput[]) {
    return this.licenseDetailService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseDetailService.remove(id);
  }
}

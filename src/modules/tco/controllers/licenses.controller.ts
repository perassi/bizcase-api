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

import { LicenseService } from '../services';
import { LicenseInput, LicenseCreationInput, LicensesArgs } from '../dto';

@ApiBearerAuth()
@ApiTags('licenses')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get('')
  async findAll(@Query() args?: LicensesArgs) {
    return this.licenseService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: LicensesArgs) {
    return this.licenseService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: LicenseCreationInput) {
    return this.licenseService.create({ ...data });
  }

  @ApiBody({ type: [LicenseCreationInput] })
  @Post('/insert-many')
  async insertMany(@Body() data: LicenseCreationInput[]) {
    return this.licenseService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: LicenseInput) {
    return this.licenseService.save(id, data);
  }

  @ApiBody({ type: [LicenseInput] })
  @Post('/save-many')
  async saveMany(@Body() data: LicenseInput[]) {
    return this.licenseService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseService.remove(id);
  }
}

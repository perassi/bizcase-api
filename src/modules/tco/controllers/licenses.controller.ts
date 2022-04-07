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
import { BizcaseGuard } from 'modules/bizcases/guards/bizcase.guard';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/tcos/:tcoId/licenses')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/tcos/:tcoId/licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Query() args?: LicensesArgs) {
    return this.licenseService.findAll({ ...args });
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Query() args?: LicensesArgs) {
    return this.licenseService.findAllPagination({ ...args });
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: LicenseCreationInput) {
    return this.licenseService.create({ ...data });
  }

  @ApiBody({ type: [LicenseCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: LicenseCreationInput[]) {
    return this.licenseService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: LicenseInput) {
    return this.licenseService.save(id, data);
  }

  @ApiBody({ type: [LicenseInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: LicenseInput[]) {
    return this.licenseService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseService.remove(id);
  }
}

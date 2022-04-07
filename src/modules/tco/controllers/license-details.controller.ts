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

import { LicenseDetailService } from '../services';
import { LicenseDetailInput, LicenseDetailCreationInput, LicenseDetailsArgs } from '../dto';
import { BizcaseGuard } from 'modules/bizcases/guards/bizcase.guard';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/tcos/:tcoId/licenses/:licenseId/license-details')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/tcos/:tcoId/licenses/:licenseId/license-details')
export class LicenseDetailController {
  constructor(private readonly licenseDetailService: LicenseDetailService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Query() args?: LicenseDetailsArgs) {
    return this.licenseDetailService.findAll({ ...args });
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Query() args?: LicenseDetailsArgs) {
    return this.licenseDetailService.findAllPagination({ ...args });
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseDetailService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: LicenseDetailCreationInput) {
    return this.licenseDetailService.create({ ...data });
  }

  @ApiBody({ type: [LicenseDetailCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: LicenseDetailCreationInput[]) {
    return this.licenseDetailService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: LicenseDetailInput) {
    return this.licenseDetailService.save(id, data);
  }

  @ApiBody({ type: [LicenseDetailInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: LicenseDetailInput[]) {
    return this.licenseDetailService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.licenseDetailService.remove(id);
  }
}

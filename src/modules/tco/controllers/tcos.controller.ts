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

import { TcoService } from '../services';
import { TcoInput, TcoCreationInput, TcosArgs } from '../dto';

import { BizcaseGuard } from 'modules/bizcases/guards/bizcase.guard';

@ApiBearerAuth()
@ApiTags('bizcases/:bizcaseId/tcos')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases/:bizcaseId/tcos')
export class TcoController {
  constructor(private readonly tcoService: TcoService) {}

  @Get('')
  @UseGuards(BizcaseGuard)
  async findAll(@Query() args?: TcosArgs) {
    return this.tcoService.findAll({ ...args });
  }

  @Get('/paginate')
  @UseGuards(BizcaseGuard)
  async findAllPagination(@Query() args?: TcosArgs) {
    return this.tcoService.findAllPagination({ ...args });
  }

  @Get('/:id')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tcoService.findOneById(id);
  }

  @Post('')
  @UseGuards(BizcaseGuard)
  async create(@Body() data: TcoCreationInput) {
    return this.tcoService.create({ ...data });
  }

  @ApiBody({ type: [TcoCreationInput] })
  @Post('/insert-many')
  @UseGuards(BizcaseGuard)
  async insertMany(@Body() data: TcoCreationInput[]) {
    return this.tcoService.insertMany(data);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: TcoInput) {
    return this.tcoService.save(id, data);
  }

  @ApiBody({ type: [TcoInput] })
  @Post('/save-many')
  @UseGuards(BizcaseGuard)
  async saveMany(@Body() data: TcoInput[]) {
    return this.tcoService.saveMany(data);
  }

  @Delete('/:id')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tcoService.remove(id);
  }
}

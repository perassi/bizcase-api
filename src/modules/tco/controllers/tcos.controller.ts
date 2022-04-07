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

@ApiBearerAuth()
@ApiTags('tcos')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('tcos')
export class TcoController {
  constructor(private readonly tcoService: TcoService) {}

  @Get('')
  async findAll(@Query() args?: TcosArgs) {
    return this.tcoService.findAll({ ...args });
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: TcosArgs) {
    return this.tcoService.findAllPagination({ ...args });
  }

  @Get('/:id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tcoService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: TcoCreationInput) {
    return this.tcoService.create({ ...data });
  }

  @ApiBody({ type: [TcoCreationInput] })
  @Post('/insert-many')
  async insertMany(@Body() data: TcoCreationInput[]) {
    return this.tcoService.insertMany(data);
  }

  @Post('/:id')
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: TcoInput) {
    return this.tcoService.save(id, data);
  }

  @ApiBody({ type: [TcoInput] })
  @Post('/save-many')
  async saveMany(@Body() data: TcoInput[]) {
    return this.tcoService.saveMany(data);
  }

  @Delete('/:id')
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tcoService.remove(id);
  }
}

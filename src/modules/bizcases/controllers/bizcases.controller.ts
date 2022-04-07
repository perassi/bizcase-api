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

import { BizcaseService } from '../services';
import { BizcaseInput, BizcaseCreationInput, BizcasesArgs } from '../dto';
import { BizcaseGuard } from '../guards';

@ApiBearerAuth()
@ApiTags('bizcases')
@UseGuards(AuthGuard())
@UseInterceptors(ClassSerializerInterceptor)
@Controller('bizcases')
export class BizcaseController {
  constructor(private readonly bizcaseService: BizcaseService) {}

  @Get('')
  async findAll(@Query() args?: BizcasesArgs, @CurrentUser() user?: User) {
    return this.bizcaseService.findAll(args, user);
  }

  @Get('/paginate')
  async findAllPagination(@Query() args?: BizcasesArgs, @CurrentUser() user?: User) {
    return this.bizcaseService.findAllPagination(args, user);
  }

  @Get('/:bizcaseId')
  @UseGuards(BizcaseGuard)
  async findOne(@Param('bizcaseId', new ParseIntPipe()) id: number) {
    return this.bizcaseService.findOneById(id);
  }

  @Post('')
  async create(@Body() data: BizcaseCreationInput, @CurrentUser() user: User) {
    return this.bizcaseService.create({ ...data, userId: user.id });
  }

  @ApiBody({ type: [BizcaseCreationInput] })
  @Post('/insert-many')
  async insertMany(@Body() data: BizcaseCreationInput[], @CurrentUser() user: User) {
    return this.bizcaseService.insertMany(data.map(bc => ({ ...bc, userId: user.id })));
  }

  @Post('/:bizcaseId/add-shared-users')
  @ApiBody({ type: [Number] })
  @UseGuards(BizcaseGuard)
  async addSharedUsers(@Param('bizcaseId', new ParseIntPipe()) id: number, @Body() userIds: number[]) {
    return this.bizcaseService.addSharedUsers(id, userIds);
  }

  @Post('/:bizcaseId/remove-shared-users')
  @ApiBody({ type: [Number] })
  @UseGuards(BizcaseGuard)
  async removeSharedUsers(@Param('bizcaseId', new ParseIntPipe()) id: number, @Body() userIds: number[]) {
    return this.bizcaseService.removeSharedUsers(id, userIds);
  }

  @Post('/:id/clone')
  @UseGuards(BizcaseGuard)
  async clone(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.clone(id);
  }

  @Post('/:id')
  @UseGuards(BizcaseGuard)
  async save(@Param('id', new ParseIntPipe()) id: number, @Body() data: BizcaseInput) {
    return this.bizcaseService.save({ ...data, id });
  }

  @ApiBody({ type: [BizcaseInput] })
  @Post('/save-many')
  async saveMany(@Body() data: BizcaseInput[]) {
    return this.bizcaseService.saveMany(data);
  }

  @Delete('/:bizcaseId')
  @UseGuards(BizcaseGuard)
  async remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.bizcaseService.remove(id);
  }
}

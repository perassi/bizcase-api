import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealtch(): string {
    return 'OK';
  }
}

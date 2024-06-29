import { Controller, Get } from '@nestjs/common';
import { SrvService } from './srv.service';

@Controller()
export class SrvController {
  constructor(private readonly srvService: SrvService) {}

  @Get()
  getHello(): string {
    return this.srvService.getHello();
  }
}

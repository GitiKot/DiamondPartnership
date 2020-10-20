import { Controller, Get, Header, Post,Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


// @Post('login')
// async login(@Request() req){
// return this.appService.getHello();
//   // return this.appService.login(req.partner);
//   //this is post method it reqpuest the data from ....
// }
  @Get()
@Header('Content-Type', 'text/html')
  getHello(): string {
    return this.appService.getHello();
  }
  
  
}

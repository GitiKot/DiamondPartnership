import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException, ExecutionContext,} from '@nestjs/common'; 
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthService {
  constructor(private companyService: CompanyService, private jwtService: JwtService) { }
  async validateCompany(username: string, pass: string): Promise<any> {
    const comp = await this.companyService.findOne(username);
    if (comp && comp.password === pass) {
      const { password, ...result } = comp;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

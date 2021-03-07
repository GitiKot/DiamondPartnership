
import { Injectable } from '@nestjs/common';

export type Company = any;

@Injectable()
export class CompanyService {
  private readonly companys = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<Company | undefined> {
    return this.companys.find(comp => comp.username === username);
  }
}
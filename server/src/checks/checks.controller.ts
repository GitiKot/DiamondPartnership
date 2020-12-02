import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChecksService } from './checks.service';
import { createChecksDto } from './dto/create-check.dto';

@Controller('checks')
export class ChecksController {
    constructor(private readonly checksService: ChecksService) { }
    @Post()
    async addChecks(@Body() createChecksDto: createChecksDto) {
        return this.checksService.addChecks(createChecksDto);
    }

    @Get()
    async getAllChecks() {
        const checks = await this.checksService.getChecks();
        return checks;
    }

   
    @Delete(':id')
    async removeProduct(@Param('id') chId: string) {
        await this.checksService.deleteChecks(chId);
    }
}

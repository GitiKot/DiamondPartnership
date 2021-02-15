import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { userService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: userService) { }
    @Post()
    async addUser(@Body() createUserDto: createUserDto) {
        return this.userService.addUser(createUserDto);
    }
//     @Post()
//     async register(@Body() createUserDto: createUserDto) {
// console.log("signup post controller");
//         return this.userService.addUser(createUserDto);
//     }
//     @Post(':signup')
//     async register(@Body() createUserDto: createUserDto) {
// console.log("signup post controller");
//         return this.userService.register(createUserDto);
//     }
    

    @Get()
    async getAllUser() {
        const user = await this.userService.getUser();
        return user;
    }

    @Patch(':id')
    async updateUser(
        @Param('id') id: string,
        @Body('userName') userName: string,
        @Body('password') password: string,
    ) {
        await this.userService.updateUser(id, userName,password);
        return null;
    }
    @Get(':userName')
    findByUserName(@Param('userName') userName: string) {

        const un = this.userService.findByUserName(userName);
        console.log("un", un);
        return un;
    }

    @Delete(':id')
    async removeProduct(@Param('id') uId: string) {
        await this.userService.deleteUser(uId);
    }
}

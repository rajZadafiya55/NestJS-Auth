import { Controller,Post,Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService:UsersService){}

    @Post('/signup')
    async createUser(
        @Body('password') password:string,
        @Body('username') username:string,
    ):Promise<User>{
        const salOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password,salOrRounds)
        const result = await this.usersService.createUser(
            username,
            hashedPassword
        );
        return result
    }
}

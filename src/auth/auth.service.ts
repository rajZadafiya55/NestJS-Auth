import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService,private jwtService:JwtService){}
    async validateUser(username:string,password:string):Promise<any>{
        const user = await this.userService.getUser({username});
        if(!user){
            return null  
        };
        const passwordValid = await bcrypt.compare(password,user.password)
        if(!user){
            throw new HttpException('invalid credinals',HttpStatus.BAD_REQUEST)
        }
        if(user && passwordValid){
            return user
        }
        return null
    }
    async login(user:any){
        const payload = {username:user.username,sub:user._id}
        return{
            message:"user Login SuccessFully",
            access_token:this.jwtService.sign(payload)
        }
    }
}

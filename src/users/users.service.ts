import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

@Injectable()
export class UsersService {
    constructor(@InjectModel('user') private readonly userModel:Model<UserDocument>){}
    async createUser(username:string,password:string):Promise<User>{
        return this.userModel.create({
            username,
            password    
        }); 
    }
    async getUser(query:object):Promise<User>{
        const data =  this.userModel.findOne(query);
        if(!data){
            throw new HttpException('invalid credinals',HttpStatus.BAD_REQUEST)
          }
            return data
        } 
    }

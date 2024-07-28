import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { LocalStartegy } from './local.auth';

@Module({
    imports:[UsersModule,PassportModule,JwtModule.register({
        secret:'key',
        signOptions:{expiresIn:'1d'}
    }),MongooseModule.forFeature([{name:'user',schema:UserSchema}])],
    providers: [AuthService,UsersService,LocalStartegy],
    controllers: [AuthController]
})
export class AuthModule {}

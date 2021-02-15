import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { AuthController } from './auth.controller';
// import { UserSchema } from '../user/user.model';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
    imports:[ UserModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
        // MongooseModule.forFeature([{ name: 'user', schema: UserSchema },
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
      // controllers:[ChecksController],
     exports: [AuthService],
})
export class AuthModule {}
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DrizzleService } from '@src/drizzle/drizzle.service';
import { DrizzleModule } from '@src/drizzle/drizzle.module';
import { UserRepository } from './user.repository';
import { PassportModule } from "@nestjs/passport"
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: "jwt"
    }),
    JwtModule.register({
      secret: "topSecret51",
      signOptions: {
        expiresIn: 3600
      }
    }),
    DrizzleModule],
  providers: [AuthService, DrizzleService, UserRepository],
  controllers: [AuthController]
})
export class AuthModule { }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userRepository: UserRepository
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto) {
        return this.userRepository.createUser(authCredentialsDto)
    }

    async signIn(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;

        const user = await this.userRepository.findOne({
            username
        })

        if (user && (await bcrypt.compare(password, user.password))) {

            // sign jwt with username
            const payload: JwtPayload = { username };

            const accessToken = await this.jwtService.sign(payload)

            return {
                access_token: accessToken
            }
        } else {
            throw new UnauthorizedException("Please check your email or password.")
        }
    }
}

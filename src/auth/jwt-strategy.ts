import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "@src/drizzle/schema.types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository
    ) {
        super({
            secretOrKey: "topSecret51",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload) {
        const { username } = payload;


        const user: User = await this.userRepository.findOne({
            username
        })

        if (!user) {
            throw new UnauthorizedException()
        }

        return user

    }
}

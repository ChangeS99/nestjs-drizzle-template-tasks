import { Injectable } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

}
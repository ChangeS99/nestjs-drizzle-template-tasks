import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @IsString()
    @IsNotEmpty()
    // @MinLength(8)
    // @MaxLength(32)
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    //     message: "Password is weak."
    // })
    password: string
}
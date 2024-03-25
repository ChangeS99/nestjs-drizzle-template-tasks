import { DrizzleAsyncProvider } from "@src/drizzle/drizzle.provider";
import { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import * as schema from "@src/drizzle/schema"
import { ConflictException, Inject, InternalServerErrorException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";

import bcrypt from "bcrypt"
import { User } from "@src/drizzle/schema.types";

export class UserRepository {
    constructor(
        @Inject(DrizzleAsyncProvider) readonly db: BetterSQLite3Database<typeof schema>
    ) { }

    async findOne({ username }: { username: string }): Promise<User> {
        return this.db.query.users.findFirst({
            where: (users, { eq }) => eq(users.username, username)
        })
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        try {

            const salt = await bcrypt.genSalt();

            const hashedPassword = await bcrypt.hash(password, salt)

            const user = await this.db.insert(schema.users).values({
                username,
                password: hashedPassword
            }).returning()

        } catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT_UNIQUE')
                throw new ConflictException("Username already exists")

            throw new InternalServerErrorException("Something went wrong.")
        }
    }
}
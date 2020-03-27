import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
    ConflictException,
    InternalServerErrorException
} from '@nestjs/common';
import User from './entities/user.entity';
import AuthCredentialsDto from './dtos/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp({ email, password }: AuthCredentialsDto): Promise<User> {
        const user = this.create();
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword({
        email,
        password
    }: AuthCredentialsDto): Promise<string | null> {
        const user = await this.findOne({ email });

        if (user && (await user.validatePassword(password))) {
            return user.email;
        }

        return null;
    }

    private async hashPassword(
        password: string,
        salt: string
    ): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
  
import { Resolver, Mutation, Args , InterfaceType, Field } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import User from '../entities/user.entity';
import AuthCredentialsDto from '../dtos/auth-credentials.dto';

import LoginResponse from '../responseTypes/loginResponse';

@Resolver()
class UserResolver {
    constructor(private authService: AuthService) {}

    @Mutation(() => User)
    async signUp(
        @Args('credentials') authCredentialsDto: AuthCredentialsDto
    ): Promise<User> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Mutation(() => LoginResponse)
    async signIn(
        @Args('credentials') authCredentialsDto: AuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto);
    }
}

export default UserResolver;
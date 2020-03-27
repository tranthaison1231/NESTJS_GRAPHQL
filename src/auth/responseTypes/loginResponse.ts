import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export default class LoginResponse {
    @Field()
    accessToken: string;
}
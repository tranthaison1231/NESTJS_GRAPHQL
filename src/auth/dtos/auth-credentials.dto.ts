import { IsString, MinLength, MaxLength, Max, Matches } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class AuthCredentialsDto {
  @IsString()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'Email is not valid',
    },
  )
  @Field()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @Field()
  password: string;
}

export default AuthCredentialsDto;

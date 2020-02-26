import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateTaskDto {
    @IsNotEmpty()
    @Field()
    title: string;

    @IsNotEmpty()
    @Field()
    description: string;
}

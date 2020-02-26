import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { TaskStatus } from '../enums/TaskStatus';

@InputType()
export class UpdateTaskDto {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    status?: TaskStatus;
}

import {
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { TaskStatus } from './enums/TaskStatus';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(): Promise<Task[]> {
        const query = this.createQueryBuilder('task');

        const tasks = await query.getMany();

        return tasks;
    }

    async createTask({ title, description }: CreateTaskDto): Promise<Task> {
        const task = this.create({
            title,
            description,
            status: TaskStatus.IS_OPEN
        });

        try {
            await task.save();
            return task;
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}

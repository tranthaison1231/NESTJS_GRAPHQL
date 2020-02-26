import {
    Injectable,
    NotFoundException,
    InternalServerErrorException
} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
    constructor(private taskRepository: TaskRepository) {}

    async getTasks(): Promise<Task[]> {
        return await this.taskRepository.getTasks();
    }

    async getTaskById(id: string): Promise<Task> {
        const task = await this.taskRepository.findOne({ id });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found.`);
        }

        return task;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async updateTask(
        id: string,
        { title, description, status }: UpdateTaskDto
    ): Promise<Task> {
        const task = await this.getTaskById(id);

        if (title) {
            task.title = title;
        }

        if (description) {
            task.description = description;
        }

        if (status) {
            task.status = status;
        }

        await task.save();

        return task;
    }

    async deleteTask(id: string): Promise<string> {
        const deleteResult = await this.taskRepository.delete({ id });

        if (deleteResult.affected === 0) {
            throw new InternalServerErrorException(
                `Task with ID ${id} not found.`
            );
        } else {
            return id;
        }
    }
}

import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { TasksResolver } from './resolvers/task.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([TaskRepository])],
    providers: [TasksResolver, TasksService]
})
export class TasksModule {}

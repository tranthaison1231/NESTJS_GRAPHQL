import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TasksResolver } from './resolvers/task.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([TaskRepository]),
        JwtModule.register({
            secret: 'secret'
        })
    ],
    providers: [TasksResolver, TasksService]
})
export class TasksModule {}
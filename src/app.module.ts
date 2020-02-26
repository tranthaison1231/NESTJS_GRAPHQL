import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        }),
        TasksModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}

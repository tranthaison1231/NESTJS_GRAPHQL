import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import * as bcrypt from 'bcryptjs';
import { Task } from 'src/tasks/entities/task.entity';

@Entity()
@Unique(['email'])
@ObjectType()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  salt: string;

  @OneToMany(
      type => Task,
      task => task.user,
      { eager: true }
  )
  @Field(type => [Task])
  tasks: Task[];

  async validatePassword(password: string): Promise<boolean> {
      const hash = await bcrypt.hash(password, this.salt);

      return hash === this.password;
  }
}

export default User;
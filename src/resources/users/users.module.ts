import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { LoginController } from '../login/login.controller';
import { LoginService } from '../login/login.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TasksModule],
  controllers: [UsersController, LoginController],
  providers: [UsersService, LoginService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './board.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), TasksModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}

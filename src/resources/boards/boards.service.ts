import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import * as boardsRepo from './board.db.repository';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class BoardsService {
  constructor(private readonly taskService: TasksService) { };

  create(createBoardDto: Board) {
    return boardsRepo.save(createBoardDto);
  }

  findAll() {
    return boardsRepo.getAll();
  }

  findOne(id: string) {
    return boardsRepo.getById(id);
  }

  update(id: string, updateBoardDto: Board) {
    return boardsRepo.update(id, updateBoardDto);
  }

  async remove(id: string) {
    await this.taskService.removeOnBoard(id);
    return boardsRepo.remove(id);
  }
}

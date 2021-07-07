import { Injectable } from '@nestjs/common';
import { Board } from './board.model';
import { TasksService } from '../tasks/tasks.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(private readonly taskService: TasksService, 
    @InjectRepository(Board) private boardsRepo: Repository<Board>) { };

  async create(createBoardDto: Board):Promise<Board> {
    const board = this.boardsRepo.create(createBoardDto);
    return this.boardsRepo.save(board);
  }

  async findAll():Promise<Board[]> {
    return this.boardsRepo.find({where: {}});
  }

  async findOne(id: string) :Promise<Board | null>{
    const result = await this.boardsRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
  }

  async update(id: string, updateBoardDto: Board) :Promise<Board>{
    const result = await this.boardsRepo.update(id, updateBoardDto);
    return result.raw;
  }

  async remove(id: string) {
    await this.taskService.removeOnBoard(id);
    return this.boardsRepo.delete(id);
  }
}

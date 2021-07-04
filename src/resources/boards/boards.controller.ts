import { Controller, Get, Post, Body, Put, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BoardsService } from './boards.service';
import { Board } from './board.model';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Post()
  create(@Body() createBoardDto: Board) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const board: Board | null = await this.boardsService.findOne(id);
    if (board) {
      return res.status(HttpStatus.OK).json(Board.toResponse(board))
    } else {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "task not found" });
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: Board) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.boardsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Put, Param, Delete, HttpStatus, HttpException, Header, UseFilters, UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { Filter } from '../../common/filter';
import { AuthGuard } from 'guards/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Post()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  create(@Body() createBoardDto: Board) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async findOne(@Param('id') id: string) {
    const board: Board | null = await this.boardsService.findOne(id);
    if (board) {
      return Board.toResponse(board);
    } else {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  update(@Param('id') id: string, @Body() updateBoardDto: Board) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  @UseFilters(Filter)
  @Header('Content-Type', 'application/json')
  async remove(@Param('id') id: string) {
    await this.boardsService.remove(id);
  }
}

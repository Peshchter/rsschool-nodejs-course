import {Board} from "./board.model";
import * as boardsRepo from './board.db.repository';
import * as tasksService from '../tasks/task.service';

const getAll = ():Promise<Board[]> => boardsRepo.getAll();
const getById = (id:string):Promise<Board | null> => boardsRepo.getById(id);
const save = (board: Board):Promise<Board> => boardsRepo.save(board);
const remove = async (id:string): Promise<void> => {
    await tasksService.removeOnBoard(id);
    return boardsRepo.remove(id);
}
const update = (id:string, params:Board): Promise<Board> => boardsRepo.update(id, params);

export { getAll, getById, save, remove, update };

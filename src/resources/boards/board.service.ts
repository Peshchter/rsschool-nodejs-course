import {Board} from "./board.model";
import * as boardsRepo from './board.db.repository';
import * as tasksService from '../tasks/task.service';

const getAll = ():Promise<Board[]> => boardsRepo.getAll();
const getById = (id:string):Promise<Board | null> => boardsRepo.getById(id);
const save = (board: Board):Promise<Board> => boardsRepo.save(board);
const remove = (id:string): void => {
    boardsRepo.remove(id).then();
    tasksService.removeOnBoard(id).then();
}
const update = (id:string, params:Board): Promise<Board> => boardsRepo.update(id, params);

export { getAll, getById, save, remove, update };

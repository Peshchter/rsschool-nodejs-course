import {Board} from "./board.model";
import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';

const getAll = () => boardsRepo.getAll();
const getById = (id:string) => boardsRepo.getById(id);
const save = (board: Board) => boardsRepo.save(board);
const remove = (id:string) => {
    boardsRepo.remove(id);
    tasksService.removeOnBoard(id).then();
}
const update = (id:string, params:Board): Board => boardsRepo.update(id, params);

export { getAll, getById, save, remove, update };

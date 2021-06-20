import {getRepository} from "typeorm";
import {Board} from './board.model';

const getAll = async ():Promise<Board[]> => {
    const boardsRepo = getRepository(Board);
    return boardsRepo.find({where: {}});
}

const getById = async (id : string):Promise<Board | null> => {
    const boardsRepo = getRepository(Board);
    const result = await boardsRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
}

const save = async (params: Board):Promise<Board> => {
    const boardsRepo = getRepository(Board);
    const board = boardsRepo.create(params);
    return boardsRepo.save(board);
};

const remove = async (id:string):Promise<void> => {
    const boardsRepo = getRepository(Board);
    await boardsRepo.delete(id);
};

const update = async (id:string, body: Board):Promise<Board> => {
    const boardsRepo = getRepository(Board);
    const result = await boardsRepo.update(id, body);
    return result.raw;
};

export { getAll, getById, save, remove, update };

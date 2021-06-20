import {getRepository} from "typeorm";
import {Task} from './task.model';

const getAll = async ():Promise<Task[]> => {
    const tasksRepo = getRepository(Task);
    return tasksRepo.find({where: {}});
}

const getById = async (id: string):Promise<Task|null> => {
    const tasksRepo = getRepository(Task);
    const result = await tasksRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
}

const save = async (params : Task):Promise<Task> => {
    const taskRepo = getRepository(Task);
    const task = taskRepo.create(params);
    return taskRepo.save(task);
};

const remove = async (id:string):Promise<void> => {
    const taskRepo = getRepository(Task);
    await taskRepo.delete(id);
};

const removeUserId = async (userId:string):Promise<void> => {
    const tasksRepo = getRepository(Task);
    let list = await tasksRepo.find({userId});
    list = list.map(
        (e)=> ({...e, userId: null }));
    await tasksRepo.save(list);
};

const removeOnBoard = async (boardId:string):Promise<void> => {
    const taskRepo = getRepository(Task);
    await taskRepo.delete({boardId});
};

const update = async (id:string, body: Task):Promise<Task> => {
    const taskRepo = getRepository(Task);
    const result = await taskRepo.update(id, body);
    return result.raw;
};

export { getAll, getById, save, remove, update, removeUserId, removeOnBoard };

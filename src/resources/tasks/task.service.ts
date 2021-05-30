import * as tasksRepo from './task.memory.repository';
import {Task} from "./task.model";

const getAll = () => tasksRepo.getAll();
const getById = (id:string) => tasksRepo.getById(id);
const save = (task:Task) => tasksRepo.save(task);
const remove = (id:string) => tasksRepo.remove(id);
const removeUserId = (id:string) => tasksRepo.removeUserId(id);
const removeOnBoard = (id:string) => tasksRepo.removeOnBoard(id);
const update = (id:string, params:Task):Promise<Task> => tasksRepo.update(id, params);

export { getAll, getById, save, remove, update, removeUserId,removeOnBoard };

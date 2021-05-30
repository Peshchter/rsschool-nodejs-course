import {User, IUserFields} from "./user.model";

const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');


const getAll = () => usersRepo.getAll();
const getById = (id : string) => usersRepo.getById(id);
const save = (user: IUserFields) => usersRepo.save(user);
const remove = (id : string) => {
    usersRepo.remove(id);
    tasksService.removeUserId(id);
}
const update = (id : string, params: User) => usersRepo.update(id, params);

export { getAll, getById, save, remove, update };

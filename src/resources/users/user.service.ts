import {IUserFields, User} from "./user.model";
import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';


const getAll = () => usersRepo.getAll();
const getById = (id : string) => usersRepo.getById(id);
const save = (user: IUserFields) => usersRepo.save(user);
const remove = (id : string) => {
    usersRepo.remove(id);
    tasksService.removeUserId(id).then();
}
const update = (id : string, params: User):User => usersRepo.update(id, params);

export { getAll, getById, save, remove, update };

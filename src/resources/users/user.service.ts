import {User, UserDTO} from "./user.model";
import * as usersRepo from './user.db.repository';
import * as tasksService from '../tasks/task.service';


const getAll = ():Promise<User[]> => usersRepo.getAll();
const getById = (id : string):Promise<User|null> => usersRepo.getById(id);
const save = (user: UserDTO):Promise<User> => usersRepo.save(user);
const remove = (id : string):void => {
    usersRepo.remove(id).then();
    tasksService.removeUserId(id).then();
}
const update = (id : string, params: UserDTO):Promise<User> => usersRepo.update(id, params);

export { getAll, getById, save, remove, update };

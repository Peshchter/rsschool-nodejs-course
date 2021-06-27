import {User, UserDTO} from "./user.model";
import * as usersRepo from './user.db.repository';
import * as tasksService from '../tasks/task.service';


const getAll = ():Promise<User[]> => usersRepo.getAll();
const getByLogin = (login: string): Promise<User | null> => usersRepo.getByLogin(login);
const getById = (id : string):Promise<User|null> => usersRepo.getById(id);
const save = (user: UserDTO):Promise<User> => usersRepo.save(user);
const remove = async (id: string):Promise<void> => {
     await tasksService.removeUserId(id);
     return usersRepo.remove(id);
}
const update = (id : string, params: UserDTO):Promise<User> => usersRepo.update(id, params);

export { getAll, getById, getByLogin,save, remove, update };

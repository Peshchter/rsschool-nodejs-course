import {getRepository} from 'typeorm';
import {User, UserDTO} from './user.model';

const getAll = async (): Promise<User[]> => {
    const userRepo = getRepository(User);
    return userRepo.find({where: {}});
};

const getById = async (id: string): Promise<User | null> => {
    const userRepo = getRepository(User);
    const result = await userRepo.findOne(id);
    if (result === undefined) {
        return null;
    }
    return result;
}

const save = async (params: UserDTO): Promise<User> => {
    const userRepo = getRepository(User);
    const user = userRepo.create(params);
    return userRepo.save(user);
};

const remove = async (id: string): Promise<void> => {
    const userRepo = getRepository(User);
    await userRepo.delete(id);
};

const update = async (id: string, body: UserDTO): Promise<User> => {
    const userRepo = getRepository(User);
    const result = await userRepo.update(id, body);
    return result.raw;
};

/**
 * Exports required functions
 */
export {getAll, getById, save, remove, update};

const usersRepo = require('./user.memory.repository');
const tasksService  =require('../tasks/task.service');


const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const save = (user) => usersRepo.save(user);
const remove = (id) => {
    usersRepo.remove(id);
    tasksService.removeUserId(id);
}
const update = (id, params) => usersRepo.update(id, params);

module.exports = { getAll, getById, save, remove, update };

const usersRepo = require('./user.memory.repository');


const getAll = () => usersRepo.getAll();
const getById = (id) => usersRepo.getById(id);
const save = (user) => usersRepo.save(user);
const remove = (id) => usersRepo.remove(id);
const update = (id, params) => usersRepo.update(id, params);

module.exports = { getAll, getById, save, remove, update };

const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();
const getById = (id) => tasksRepo.getById(id);
const save = (task) => tasksRepo.save(task);
const remove = (id) => tasksRepo.remove(id);
const removeUserId = (id) => tasksRepo.removeUserId(id);
const removeOnBoard = (id) => tasksRepo.removeOnBoard(id);
const update = (id, params) => tasksRepo.update(id, params);

module.exports = { getAll, getById, save, remove, update, removeUserId,removeOnBoard };

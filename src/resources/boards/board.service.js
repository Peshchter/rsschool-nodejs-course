const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const getById = (id) => boardsRepo.getById(id);
const save = (board) => boardsRepo.save(board);
const remove = (id) => {
    boardsRepo.remove(id);
    tasksService.removeOnBoard(id);
}
const update = (id, params) => boardsRepo.update(id, params);

module.exports = { getAll, getById, save, remove, update };

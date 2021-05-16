const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.save({name : req.body.name, password: req.body.password, login: req.body.login});
  res.status(201).json(Board.toResponse(board));
});

router.use('/:boardId/tasks',(req, res, next)=> {
  req.boardId = req.params.boardId;
  next();
}, tasksRouter );

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.status(200).json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(200).send();
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if(board){
    res.status(200).json(Board.toResponse(board))
  } else {
    res.status(404).json({ message: "board not found"});
  }
});

module.exports = router;

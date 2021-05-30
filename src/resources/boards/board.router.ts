import express, {Request, Response} from 'express';
import {Board} from './board.model';
import * as boardsService from './board.service';
import tasksRouter from '../tasks/task.router';

const router = express.Router({mergeParams: true});
type modifiedRequest = {
  boardId?: string;
}
router.route('/').get(async (_req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.save(req.body);
  res.status(201).json(Board.toResponse(board));
});

router.use('/:boardId/tasks',(req:Request & modifiedRequest, _res:Response, next)=> {
  req.boardId = req.params['boardId'];
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

export default router;

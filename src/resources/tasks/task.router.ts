import express, {Request} from 'express';
import {Task} from './task.model';
import * as tasksService from './task.service';

const router = express.Router();
type modifiedRequest = {
  boardId?: string;
}

router.route('/').get(async (_req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

router.route('/').post(async (req:Request & modifiedRequest, res) => {
  if (!req.body.boardId){
    req.body.boardId = req.boardId;
  }
  const task = await tasksService.save(req.body);
  res.status(201).json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(req.params.id, req.body);
  res.status(200).json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(200).send();
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.id);
  if(task){
    res.status(200).json(Task.toResponse(task))
  } else {
    res.status(404).json({ message: "task not found"});
  }
});

export default router;

import express from 'express';
import {User} from './user.model';
import * as usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    // const user = new User({name:'first',login:"second"});
    // res.send(user);
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
    const user = await usersService.save({
        name: req.body.name,
        password: req.body.password,
        login: req.body.login
    });
    res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(200).send();
});

router.route('/:id').get(async (req, res) => {
    const user = await usersService.getById(req.params.id);
    if (user) {
        res.status(200).json(User.toResponse(user))
    } else {
        res.status(404).json({message: "user not found"});
    }
});

export default router;

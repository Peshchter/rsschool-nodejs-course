import express from 'express';
import {User} from './user.model';
import * as usersService from './user.service';
import bcrypt from 'bcrypt';
import {SALT_ROUNDS} from '../../common/config';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    const users:User[] = await usersService.getAll();
    res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const params = {
        name: req.body.name,
        password: passwordHash,
        login: req.body.login
    };
    const user:User = await usersService.save(params);
    res.status(201).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
    const user:User = await usersService.update(req.params.id, req.body);
    res.status(200).json(User.toResponse(user!));
});

router.route('/:id').delete(async (req, res) => {
    await usersService.remove(req.params.id);
    res.status(200).send();
});

router.route('/:id').get(async (req, res) => {
    const user : User| null = await usersService.getById(req.params.id);
    if (user) {
        res.status(200).json(User.toResponse(user))
    } else {
        res.status(404).json({message: "user not found"});
    }
});

export default router;

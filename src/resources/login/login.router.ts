import express from 'express';
import { produceToken } from './login.service';

const router = express.Router();

router.route('/').post(async (req, res) => {
    const { login, password } = req.body;
    const token = await produceToken(login, password);
    if (!token) {
        res.status(403).send('Forbidden!');
    } else {
        res.status(200).json({"token": token});
    }
}); 

export default router;
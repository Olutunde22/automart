import express from 'express';
import user from './controllers/user.js';

const router = express.Router();

router.post('/signup', user.signup);

router.post('/login', user.login);

router.post('/logout', user.logout);

router.all('/*', (req, res) =>{
    res.status(400).json({
        message: 'Sorry, this endpoint does not exists'
    })
})


export default router;
import express from 'express';
import user from './controllers/user.js';
import car from './controllers/car.js'
import { authenticateToken, refreshToken } from './auth/authenticate.js'

const router = express.Router();

router.get('/car', car.getAllCarPost)

router.get('/car/:carId', car.getCarPostById)

router.get('/user/:userId/car', car.getUserPosts)

router.patch('/car/:carId', authenticateToken,car.editCarPost)

router.post('/user/signup', user.signUp);

router.post('/user/login', user.login);

router.post('/user/logout', user.logout);

router.post('/car', authenticateToken, car.createCarPost)

router.post('/refresh', refreshToken)

router.delete('/car/:id', authenticateToken, car.deleteCarPost)




export default router;
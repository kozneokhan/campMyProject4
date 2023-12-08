import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = Router();
const userController = new UserController();

// 내 정보 조회 API
router.get('/me', needSignin, userController.getMyInfo);

export default router;

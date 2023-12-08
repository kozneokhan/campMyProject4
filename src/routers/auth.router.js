// 라우터 설정
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const authController = new AuthController();

// 회원가입 api
router.post('/signup', authController.signup);

// 로그인 api
router.post('/signin', authController.signin);

export default router;

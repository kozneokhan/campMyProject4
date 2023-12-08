// 라우터 요청 처리

import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {
  async signup(req, res) {
    try {
      const { email, password, passwordconfirm, name } = req.body;
      const user = await authService.signup(
        email,
        password,
        passwordconfirm,
        name,
      );

      return res.status(201).json({
        success: true,
        message: '회원가입에 성공했습니다.',
        data: user,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.signin(email, password);

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: result,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  }
}

// 라우터 요청 처리

import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {
  signup = async (req, res, next) => {
    try {
      const { email, password, passwordconfirm, name } = req.body;
      const auth = await this.authService.signup(
        email,
        password,
        passwordconfirm,
        name,
      );

      return res.status(201).json({ data: auth });
    } catch (error) {
      next(err);
      // console.error(error);
      // return res.status(500).json({
      //   success: false,
      //   message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요.',
      // });
    }
  };

  signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const signin = await this.authService.signin(email, password);

      return res.status(200).json({
        success: true,
        message: '로그인에 성공했습니다.',
        data: signin,
      });
    } catch (error) {
      next(error);
      // console.error(error);
      // return res.status(500).json({
      //   success: false,
      //   message: '예상치 못한 에러가 발생했습니다. 관리자에게 문의하세요.',
      // });
    }
  };
}

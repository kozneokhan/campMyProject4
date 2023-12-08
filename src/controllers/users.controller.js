// 라우터 요청 처리
import { UserService } from '../services/user.service.js';

const userService = new UserService();

export class UserController {
  async getMyInfo(req, res, next) {
    try {
      const userId = res.locals.user?.id;

      const me = await userService.getMyInfo(userId);

      return res.status(200).json({
        success: true,
        message: '내 정보 조회에 성공했습니다.',
        data: me,
      });
    } catch (error) {
      next(error);
    }
  }
}

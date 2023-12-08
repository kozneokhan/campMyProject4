// 비즈니스 로직

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../../constants/security.constant.js';

const userRepository = new UserRepository();

export class AuthService {
  async signup(email, password, passwordconfirm, name) {
    // 비밀번호 일치 여부 확인 및 기타 유효성 검증
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    // 응답에서 비밀번호 제외
    delete user.password;

    return user;
  }

  async signin(email, password) {
    const user = await userRepository.findByEmail(email);

    // 사용자 및 비밀번호 일치 여부 확인

    const accessToken = jwt.sign({ userId: user.id }, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
    });

    return { accessToken };
  }
}

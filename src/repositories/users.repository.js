// 데이터베이스 엑세스

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  async createUser(data) {
    return prisma.user.create({ data });
  }
}

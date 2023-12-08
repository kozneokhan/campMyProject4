// 비즈니스 로직
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
  async getMyInfo(userId) {
    const me = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return me;
  }
}

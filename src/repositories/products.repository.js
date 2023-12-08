// 데이터베이스 엑세스

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
  async createProduct(data) {
    return prisma.products.create({ data });
  }

  async findAllProducts(sort) {
    return prisma.products.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        userId: true,
        user: {
          select: { name: true },
        },
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: sort },
    });
  }

  async findProductById(productId) {
    return prisma.products.findUnique({
      where: { id: parseInt(productId) },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        userId: true,
        user: {
          select: { name: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateProduct(productId, data) {
    return prisma.products.update({
      where: { id: parseInt(productId) },
      data,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteProduct(productId) {
    return prisma.products.delete({
      where: { id: parseInt(productId) },
    });
  }
}

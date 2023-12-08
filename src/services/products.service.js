// 비즈니스 로직

import { ProductRepository } from '../repositories/product.repository.js';

const productRepository = new ProductRepository();

export class ProductService {
  async createProduct(userId, title, description) {
    return productRepository.createProduct({ userId, title, description });
  }

  async getAllProducts(sort) {
    return productRepository.findAllProducts(sort);
  }

  async getProductById(productId) {
    return productRepository.findProductById(productId);
  }

  async updateProduct(productId, userId, title, description, status) {
    const data = {
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),
    };

    return productRepository.updateProduct(productId, data);
  }

  async deleteProduct(productId) {
    return productRepository.deleteProduct(productId);
  }
}

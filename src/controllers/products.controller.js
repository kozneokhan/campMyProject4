// 라우터 요청 처리

import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export class ProductsController {
  async createProduct(req, res) {
    try {
      const { id: userId, name: userName } = res.locals.user;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: '제목과 설명은 필수 입력 항목입니다.',
        });
      }

      const product = await productService.createProduct(
        userId,
        title,
        description,
      );

      return res.status(201).json({
        success: true,
        message: '상품 생성에 성공했습니다.',
        data: { ...product, userName },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

  async getProducts(req, res) {
    try {
      const { sort } = req.query;
      let upperCaseSort = sort?.toUpperCase();

      if (upperCaseSort !== 'ASC' && upperCaseSort !== 'DESC') {
        upperCaseSort = 'DESC';
      }

      const products = await productService.getAllProducts(upperCaseSort);

      return res.status(200).json({
        success: true,
        message: '상품 목록 조회에 성공했습니다.',
        data: products,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { productId } = req.params;

      const product = await productService.getProductById(productId);

      return res.status(200).json({
        success: true,
        message: '상품 조회에 성공했습니다.',
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

  async updateProduct(req, res) {
    try {
      const { productId } = req.params;
      const { title, description, status } = req.body;
      const { id: userId } = res.locals.user;

      const updatedProduct = await productService.updateProduct(
        productId,
        userId,
        title,
        description,
        status,
      );

      return res.status(200).json({
        success: true,
        message: '상품 수정에 성공했습니다.',
        data: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const { id: userId } = res.locals.user;

      const deletedProduct = await productService.deleteProduct(
        productId,
        userId,
      );

      return res.status(200).json({
        success: true,
        message: '상품 삭제에 성공했습니다.',
        data: deletedProduct,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: '예상치 못한 에러가 발생하였습니다. 관리자에게 문의하세요.',
      });
    }
  }
}

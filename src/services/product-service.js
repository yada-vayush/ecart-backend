const ProductRepository = require("../repository/product-repository");

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async create(data) {
    try {
      const product = await this.productRepository.create(data);
      return product;
    } catch (error) {
      console.log("Error occured in product service");
      throw error;
    }
  }
  async getAll() {
    try {
      const data = await this.productRepository.getAll();
      return data;
    } catch (error) {
      console.log("Error occured in the product service layer");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const data = await this.productRepository.destroy(id);
      return data;
    } catch (error) {
      console.log("Error occured in the product service layer");
      throw error;
    }
  }
}
module.exports = ProductService;

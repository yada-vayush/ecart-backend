const ProductService = require("../services/product-service");

const productService = new ProductService();
const create = async (req, res) => {
  try {
    let product = await productService.getAll();

    let id = product.length + 1;

    const response = await productService.create({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      price: req.body.price,
      inventory: req.body.inventory,
      description: req.body.description,
      available: req.body.available,
      subCategory: req.body.subCategory,
    });
    return res.status(201).json({
      success: true,
      message: "New product created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to create the product",
      err: error,
    });
  }
};
const getAll = async (req, res) => {
  try {
    const response = await productService.getAll();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the product",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Error occured in the product controller");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Data not fetched",
      err: error,
    });
  }
};
const destroy = async (req, res) => {
  try {
    const response = await productService.destroy(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product removed successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Error occured in the product controller");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to remove the product",
      err: error,
    });
  }
};

module.exports = {
  create,
  getAll,
  destroy,
};

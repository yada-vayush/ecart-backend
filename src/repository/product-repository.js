const Product = require("../model/Product");
const CrudRepository = require("./crud-repository");

const mongoose = require("mongoose");

class ProductRepository extends CrudRepository {
  constructor() {
    super(Product);
  }
}

module.exports = ProductRepository;

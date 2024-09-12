const User = require("../model/User");
const CrudRepository = require("./crud-repository");

const mongoose = require("mongoose");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getByEmail(email) {
    try {
      const response = await User.findOne(email);
      return response;
    } catch (error) {
      console.log("====================================");
      console.log("Errro occured in user repository");
      console.log("====================================");
      throw error;
    }
  }
}
module.exports = UserRepository;

const UserRepository = require("../repository/user-repository");
const bcrypt = require("bcrypt");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Error occured in user service");
    }
  }
  async get(id) {
    try {
      const data = await this.userRepository.get(id);
      return data;
    } catch (error) {
      console.log("Error occured in the user service layer");
      throw error;
    }
  }
  async getAll() {
    try {
      const data = await this.userRepository.getAll();
      return data;
    } catch (error) {
      console.log("Error occured in the user service layer");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const data = await this.userRepository.destroy(id);
      return data;
    } catch (error) {
      console.log("Error occured in the user service layer");
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      const data = await this.userRepository.getByEmail(email);

      return data;
    } catch (error) {
      console.log("Error occured in the user service layer");
    }
  }
  async update(id, cartData) {
    try {
      const data = await this.userRepository.update(id, cartData);

      return data;
    } catch (error) {
      console.log("Error occured in the user service layer");
    }
  }
}
module.exports = UserService;

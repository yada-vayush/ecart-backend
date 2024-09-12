const UserService = require("../services/user-service");
const jwt = require("jsonwebtoken");
const userService = new UserService();
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");

let cart = {};
for (let i = 0; i < 300; i++) {
  cart[i] = 0;
}
const create = async (req, res) => {
  try {
    const response = await userService.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    return res.status(201).json({
      success: true,
      message: "New USER created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to create the USER",
      err: error,
    });
  }
};
const addtoCart = async (req, res) => {
  try {
    console.log("add", req.body.itemId);
    let UserData = await userService.get(req.user.id);

    UserData.cartData[req.body.itemId] += 1;

    const response = await userService.update(
      { _id: req.user.id },
      { cartData: UserData.cartData }
    );

    return res.status(200).json({
      success: false,
      data: response,
      message: "Successfully update the user",
      err: {},
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      data: [],
      message: "Not able to update USER",
      err: error,
    });
  }
};
const getCart = async (req, res) => {
  try {
    let userData = await userService.get(req.user.id);

    return res.status(200).json({
      success: true,
      data: userData.cartData,
      message: "Successfully fetched cart data",
      err: {},
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      data: [],
      message: "Not able to fetch cart Data",
      err: error,
    });
  }
};
const removeToCart = async (req, res) => {
  try {
    console.log("remove", req.body.itemId);

    let UserData = await userService.get(req.user.id);
    if (UserData.cartData[req.body.itemId] > 0)
      UserData.cartData[req.body.itemId] -= 1;
    const response = await userService.update(
      { _id: req.user.id },
      { cartData: UserData.cartData }
    );

    return res.status(200).json({
      success: false,
      data: response,
      message: "Successfully updated the user",
      err: {},
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      data: [],
      message: "Not able to update USER",
      err: error,
    });
  }
};

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).json({
      success: false,
      data: [],
      message: "Not able to fetchthe USER",
      err: "Please authorize using valid login",
    });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        data: [],
        message: "Not able to fetchthe USER",
        err: "Please authorize using valid token",
      });
    }
  }
};
const getAll = async (req, res) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the USER",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Error occured in the USER controller");
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
    const response = await userService.destroy(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User removed successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("Error occured in the USER controller");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to remove the USER",
      err: error,
    });
  }
};

const signUp = async (req, res) => {
  try {
    let check = await userService.getByEmail({ email: req.body.email });

    if (check) {
      return res.status(400).json({
        success: false,
        message: "Existing user found with given email address",
        data: [],
        err: "Existing user found",
      });
    }

    let cart = {};
    for (let index = 0; index < 300; index++) {
      cart[index] = 0;
    }
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = await userService.create({
      name: req.body.username,
      email: req.body.email,
      password: hashPassword,
      cartData: cart,
    });

    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, "secret_ecom");
    return res.status(201).json({
      success: true,
      message: "New user created",
      data: token,
      err: {},
    });
  } catch (error) {
    console.log("Error occured in the USER controller");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to signUp the USER",
      err: error,
    });
  }
};
const login = async (req, res) => {
  try {
    const user = await userService.getByEmail({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with the provided email",
        data: [],
        err: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
        data: [],
        err: "Incorrect password",
      });
    }
    const data = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(data, "secret_ecom", { expiresIn: "1h" });

    // Respond with success and the token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: token,
      err: {},
    });
  } catch (error) {
    console.error("Error occurred in the LOGIN controller:", error);
    return res.status(500).json({
      success: false,
      data: [],
      message: "Unable to login the user",
      err: error.message,
    });
  }
};
module.exports = {
  create,
  getAll,
  destroy,
  signUp,
  login,
  addtoCart,
  fetchUser,
  removeToCart,
  getCart,
};

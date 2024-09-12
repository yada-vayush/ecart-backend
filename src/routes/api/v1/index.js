const express = require("express");
const multer = require("multer");
const path = require("path");

const ProductController = require("../../../controller/product-controller");
const UserController = require("../../../controller/user-controller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../upload/images"),
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`
    );
  },
});
router.get("/", (req, res) => {
  res.send("v1 running");
});

const upload = multer({ storage: storage });
router.use(
  "/images",
  express.static(path.resolve(__dirname, "../upload/images"))
);
router.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: true,
    image_url: `http://localhost:3001/api/v1/images/${req.file.filename}`,
  });
});
router.post("/addToCart", UserController.fetchUser, UserController.addtoCart);
router.post(
  "/removeToCart",
  UserController.fetchUser,
  UserController.removeToCart
);
router.post("/getCart", UserController.fetchUser, UserController.getCart);
router.post("/addProduct", ProductController.create);
router.get("/getAll", ProductController.getAll);
router.delete("/removeProduct/:id", ProductController.destroy);
router.post("/signUp", UserController.signUp);
router.post("/login", UserController.login);
module.exports = router;

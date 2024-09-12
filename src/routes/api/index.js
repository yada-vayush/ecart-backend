const express = require("express");
const v1Routes = require("./v1/index");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Express surver running");
});
router.use("/v1", v1Routes);
module.exports = router;

const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(
    "mongodb+srv://ayushoff2020:7PSwxYXUNlMamXDs@cluster0.dddnh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("====================================");
  console.log("database connected");
  console.log("====================================");
};
module.exports = connect;

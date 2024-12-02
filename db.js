const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost:27017/student";
const connectDb = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("db is connected ");
  } catch (error) {
    console.log("db is not connected");
  }
};
module.exports = connectDb;

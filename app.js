const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./db");
const router = require("./routes/student");

app.use(express.json());
dotenv.config();
connectDb();
app.use("/", router);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

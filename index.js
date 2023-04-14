const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const editRouter = require("./routes/editRoutes")
const gitRouter= require("./routes/gitRoutes")
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware");
require('dotenv').config()
const app = express();

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});
mongoose
  .connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
});

 
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send("GET Request Called")
})
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/edit",auth,editRouter)
app.use("/git",auth,gitRouter)
// app.use("/messge")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const editRouter = require("./routes/editRoutes")
const cookieParser = require("cookie-parser");

const app = express();
app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});
mongoose
  .connect("mongodb+srv://owndb:VInxk9KEBPe3RMcU@cluster0.ncpvelk.mongodb.net/Santhosh-audios", {
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
app.use("/api", authRoutes);
app.use("/edit", editRouter)

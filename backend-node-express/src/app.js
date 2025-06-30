const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user.routes");
const itemRouter = require("./routes/item.routes");
const adminRouter = require("./routes/admin.routes");
const mongoose = require("mongoose");

const app = express();

app.use(cors);
app.use(morgan("combined"));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("mongodb is connected.");
}).catch(err=> {
  console.log("mongodb connection failed");
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/user", userRouter);
app.use("/item", itemRouter);
app.use("/admin", adminRouter);

module.exports = app;

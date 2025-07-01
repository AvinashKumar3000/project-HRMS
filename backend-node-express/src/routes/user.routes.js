const express = require("express");
const bcryptjs = require("bcryptjs");

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const payload = req.body;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: myHeaders
    };
    const result = await fetch(
      "http://localhost:8080/student/validate",
      requestOptions
    );
    const userInfo = await result.json();
    if(bcryptjs.compare(payload.password, userInfo?.data?.password)) {
        res.status(200).json();
    }else{
        res.status(200).json();
    }
  } catch (error) {
    res.status(400).json("some thing went wrong");
  }
});

module.exports = userRouter;

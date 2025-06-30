const express = require('express');
const { useReducer } = require('react');

const userRouter = express.Router();

userRouter('/login');
useReducer('/register');

module.exports = userRouter;
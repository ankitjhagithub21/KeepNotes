const express = require('express')
const { register, login, logout, getUser } = require('../controllers/authController')
const isAuthenticated = require('../middlewares/isAuthenticated')

const authRouter = express.Router()

authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.get("/user",isAuthenticated,getUser)

module.exports = authRouter
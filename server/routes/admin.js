import express from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const adminRouter = express.Router()
const adminLayout = '../views/layouts/admin'
const jwtSecret = process.env.JWT_SECRET

/**
 * Check login - Guard
 */
const authMiddleware = (req, res, next) => {
  const token = req?.cookies?.token

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    })
  }
}

/** GET
 * Admin - Login page
 */
adminRouter.get('/admin', async (req, res) => {
  try {
    const locals = {
      title: 'Admin',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit montes.',
    }

    res.render('admin/index', { locals, layout: adminLayout })
  } catch (error) {
    console.log(error)
  }
})

/** POST
 * Admin - Check login
 */
adminRouter.post('/admin', async (req, res) => {
  try {
    const { username, password } = req?.body
    const user = await User.findOne({ username })
    const INVALID_CREDENTIALS = { message: 'Invalid credentials' }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    const token = jwt.sign({ userId: user._id }, jwtSecret)

    if (!isPasswordValid || !user) {
      return res.status(401).json(INVALID_CREDENTIALS)
    }
    res.cookie('token', token, { httpOnly: true })
    res.redirect('/dashboard')
  } catch (error) {
    console.log(error)
  }
})

/** POST
 * Admin - Register
 */
adminRouter.get('/dashboard', authMiddleware, async (req, res) => {
  res.render('admin/dashboard')
})

/** POST
 * Admin - Register
 */
adminRouter.post('/register', async (req, res) => {
  try {
    const { username, password } = req?.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      username,
      password: hashedPassword,
    })
    res.status(201).json({
      message: 'User created successfully',
      user,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Username already exists',
      })
    }
    res.status(500).json({
      message: 'Internal server error',
    })
  }
})

export default adminRouter

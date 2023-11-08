import express from 'express'
import Post from '../models/Post.js'
import User from '../models/User.js'

const adminRouter = express.Router()

const adminLayout = '../views/layouts/admin'

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

    if (req?.body?.user === 'admin' && req.body.password === 'password') {
      res.send('logged in')
    } else {
      res.send('invalid credentials')
    }

    res.redirect('/admin')
  } catch (error) {
    console.log(error)
  }
})

export default adminRouter

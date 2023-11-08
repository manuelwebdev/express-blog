import { config } from 'dotenv'
config()
import express from 'express'
import expressLayout from 'express-ejs-layouts'
import router from './server/routes/main.js'
import connectDB from './server/config/db.js'
import adminRouter from './server/routes/admin.js'

// connect to mongoDB
connectDB()

// define our app using express
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// define our template engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.use('/', router)
app.use('/', adminRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

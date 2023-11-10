import { config } from 'dotenv'
config()
import express from 'express'
import expressLayout from 'express-ejs-layouts'
import methodOverride from 'method-override'
import router from './server/routes/main.js'
import adminRouter from './server/routes/admin.js'
import connectDB from './server/config/db.js'
import cookieParser from 'cookie-parser'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import isActiveRoute from './server/helpers/routeHelpers.js'

// connect to mongoDB
connectDB()

// define our app using express
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_DB_URI,
    }),
    cookie: {
      maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  })
)

// define our template engine
app.use(expressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

app.locals.isActiveRoute = isActiveRoute

app.use('/', router)
app.use('/', adminRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

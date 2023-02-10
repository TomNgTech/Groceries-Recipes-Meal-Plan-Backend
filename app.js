const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
dotenv.config()

// Set up DB Connection
const dynamoose = require('dynamoose')
const ddb = new dynamoose.aws.ddb.DynamoDB({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
dynamoose.aws.ddb.set(ddb)

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const recipesRouter = require('./routes/recipes')
const mealPlanRouter = require('./routes/mealPlans')
const ingredientsRouter = require('./routes/ingredients')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/recipes', recipesRouter)
app.use('/mealPlan', mealPlanRouter)
app.use('/ingredients', ingredientsRouter)

module.exports = app

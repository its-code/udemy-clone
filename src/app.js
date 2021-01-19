const express = require("express")
require("./db/mongoose")
const userRouter = require("./routers/user")
const courseRouter = require("./routers/courses")
const feedbackRouter = require("./routers/feedbacks")

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(courseRouter)
app.use(feedbackRouter)

module.exports = app



const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({ extended: true }))


// routers
const userRouter = require('./routers/userRouter.js')
app.use('/api/users', userRouter)


//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
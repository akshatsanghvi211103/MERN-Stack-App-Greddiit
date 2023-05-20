const cors = require('cors')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user')
const subGRoutes = require('./routes/subG')
const postRoutes = require('./routes/posts')

const app = express()
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    // logging the requests
    console.log(req.method, req.url);
    next()
})

// routes
app.use('/api/user', userRoutes) // the actual login and register routes would translate to /api/user/login and /api/user/register
app.use('/api/posts', postRoutes)
app.use('/api/sg', subGRoutes)

// connect to the database
// below the logging middleware of .use() is important
// mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // dont forget to change the ip address in the mognodb atlas website
        // start listening to the server only after the db connection is established
        app.listen(process.env.PORT, () => {
            console.log("Connected to db and listening at port", process.env.PORT);
        })
        // console.log("Connected to db");
    })
    .catch(err => console.log(err))

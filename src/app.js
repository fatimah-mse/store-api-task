const express = require('express')
const app = express()
const morgan = require("morgan")
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
// const rateLimit = require('express-rate-limit')

const authRoutes = require('./routes/auth.routes')
const productRoutes = require('./routes/product.routes')

app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
// })
// app.use(limiter)

const allowedOrigins = [
    "http://localhost:5173",
    "https://store-api-task.onrender.com"
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use(express.static(path.join(__dirname, '../public/uploads')))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.get('/healthz', (req, res) => { res.status(200).send('OK') })

module.exports = app
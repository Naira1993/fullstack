const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path')

const cartRoute = require('./routes/cart')
const commentRoute = require('./routes/comment')
const watchRoute = require('./routes/watch')
const orderRoute = require('./routes/order')
const authRoute = require('./routes/auth')
const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/upload', express.static('upload'));

app.use('/api/comments', commentRoute)
app.use('/api/carts', cartRoute)
app.use('/api/watches', watchRoute)
app.use('/api/orders', orderRoute)
app.use('/api/auth', authRoute)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/client'))
}

app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(
            __dirname,  'client', 'dist', 'client', 'index.html'
        )
    )
})


module.exports = app
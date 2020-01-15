const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const proxy = require('http-proxy-middleware')

const app = express()

app.use(express.json({ extended: true }))
app.use(proxy('/api/*', { target: 'http://localhost:5000' }))

app.use('/api/auth', require('./routes/auth.routes'))

//TODO or require('./video.js')
// app.use('/create', function(req, res) {
//   console.log('я сделаль')
//   const users = User.find({email}).toArray(function(err, clients) {
//     if(err) return res.status(400)
//     console.log(clients)
//   })
// })
const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()

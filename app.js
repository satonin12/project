const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const socket = require('socket.io')
const proxy = require('http-proxy-middleware')
const _http = require('http')
const cors = require('cors')

const PORT = config.get('port') || 5000

// server
const app = express()

app.use(express.json({ extended: true }))
app.use(proxy('/api/*', { target: 'http://localhost:5000' }))
app.use('/api/auth', require('./routes/auth.routes'))

const server = _http.createServer(app)

server.listen(PORT, () =>
  console.log(`App has been started on port ${PORT}...`)
)

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()

// socket
const io = socket(server, {
  allowEIO3: true, // false by default
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

app.use(cors())

const users = {}
const socketToRoom = {}

io.on('connection', socket => {
  console.log(`${socket.id} is connected...`)

  socket.on('join room', roomID => {
    if (users[roomID]) {
      const length = users[roomID].length
      if (length === 4) {
        socket.emit('room full')
        return
      }
      users[roomID].push(socket.id)
    } else {
      users[roomID] = [socket.id]
    }
    socketToRoom[socket.id] = roomID
    const usersInThisRoom = users[roomID].filter(id => id !== socket.id)

    socket.emit('all users', usersInThisRoom)
  })

  socket.on('sending signal', payload => {
    io.to(payload.userToSignal).emit('user joined', {
      signal: payload.signal,
      callerID: payload.callerID,
    })
  })

  socket.on('returning signal', payload => {
    io.to(payload.callerID).emit('receiving returned signal', {
      signal: payload.signal,
      id: socket.id,
    })
  })

  socket.on('disconnect', () => {
    const roomID = socketToRoom[socket.id]
    let room = users[roomID]
    if (room) {
      room = room.filter(id => id !== socket.id)
      users[roomID] = room
    }
  })
})

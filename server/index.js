const express = require('express')
const massive = require('massive')
const session = require('express-session')
require('dotenv/config')

const authCtrl = require('./controllers/authController')
const treasureCtrl = require('./controllers/treasureController')
const auth = require('./controllers/middlewares/authMiddleware')


const app = express()
const { CONNECTION_STRING, SESSION_SECRET } = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db is connected')
})

const PORT = 4000

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly,treasureCtrl.gerUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)


app.listen(PORT, () => {console.log('listening on port', PORT)})
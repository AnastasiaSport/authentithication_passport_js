const express = require('express')
const session = require("express-session");
const FileStore = require('session-file-store')(session);
const passport = require("passport");


const app = express()
const port = 4000


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    session({
        secret: 'keyvalue pasv',
        store: new FileStore,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 1000
        }
    }))

require('./passport-config')

app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, userSession) {
        if (err) {
            return next(err)
        }
        if (!userSession) {
            // return res.redirect('./login')
            return res.send('Enter correct password or email')
        }
        req.login(userSession, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin' + userSession.username)
        })
    })(req, res, next);
})

const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect('/')
    }
}

app.get('/admin', auth, (req, res) => {
    res.send('Admin page')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const passport = require('passport');
const LocalStrategy = require('passport-local');

const userDB = {
    id: 1,
    email: '123@gmail.com',
    password: '12345'
}
//сериализация

passport.serializeUser(function (user, done) {
    console.log('serialisation', user)
    done(null, user.id)
});


//десериализация

passport.deserializeUser(function (id, done) {
    console.log('deserialisation', id)
    const user = (userDB.id === id) ? userDB : false;
    done(null, user)
});

// прописать локальную стратегию

passport.use(
    new LocalStrategy(
    ({usernameField: 'email'}, function verify(email, password, done) {
        if (email === userDB.email && password === userDB.password) {
            return done(null, userDB);
        } else {
            return done(null, false);
        }
    })
));


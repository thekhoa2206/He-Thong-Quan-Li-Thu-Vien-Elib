const express = require('express')
const port = 3000
var readerRoute = require('./routes/reader.route');
var bookRoute = require('./routes/book.route');
var borrowingRoute = require('./routes/borrowReader.route');
var borrowBookRoute = require('./routes/borrow.route');
var librarianRoute = require('./routes/librarian.route')
//const cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var authGRoute = require('./routes/authG.route');

var session = require('express-session')
const app = express()
var passport = require('passport');

var authMiddleware = require('./middlewares/auth.middleware')
var authenticateMiddleware = require('./middlewares/authenticate.middleware')


app.set('views', './views')
app.set('view engine', 'pug')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'secret',
  resave: false,
  cookie: { maxAge: 6000000 },
  saveUninitialized: true
}))
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/readers',authMiddleware.readerAuth, authenticateMiddleware.librarianAuth, readerRoute);
app.use('/books', authMiddleware.readerAuth, authenticateMiddleware.librarianAuth, bookRoute);
app.use('/borrowing',authMiddleware.readerAuth,authenticateMiddleware.readerAuth, borrowingRoute);
app.use('/viewBorrowReader',authMiddleware.readerAuth ,authenticateMiddleware.librarianAuth,  borrowBookRoute);
app.use('/librarians',authMiddleware.readerAuth ,authenticateMiddleware.adminAuth, librarianRoute)
app.use('/auth', authRoute);
app.use('/authG', authGRoute);
// index page 
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/library',authMiddleware.readerAuth ,authenticateMiddleware.librarianAuth, function(req, res) {
    res.render('library');
});

app.get('/logout', function(req, res){
	res.clearCookie("connect.sid");
	res.redirect('/')
});


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))
const express = require('express')
const port = 3000
var bodyParser = require('body-parser');
var readerRoute = require('./routes/reader.route');
var bookRoute = require('./routes/book.route');
var borrowingRoute = require('./routes/borrowReader.route');
var borrowBookRoute = require('./routes/borrow.route');
//const cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var session = require('express-session')
const app = express()
var passport = require('passport');

var authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')
app.set('view engine', 'pug')

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});

app.use('/readers',readerRoute);
app.use('/books', bookRoute);
app.use('/borrowing', authMiddleware.readerAuth, borrowingRoute);
app.use('/viewBorrowReader',  borrowBookRoute);
app.use('/auth', authRoute)

// index page 
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/library',authMiddleware.adminAuth, function(req, res) {
    res.render('library');
});
app.get('/logout', function(req, res){
	res.clearCookie("connect.sid");
	res.redirect('/')
})


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))
const express = require('express')
const port = 3000
var readerRoute = require('./routes/reader.route');
var bookRoute = require('./routes/book.route');
var borrowingRoute = require('./routes/borrowReader.route');
var borrowBookRoute = require('./routes/borrow.route');
const cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');
var session = require('express-session')
const app = express()


var authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieParser('dakshdksajfhdskj')) // use to read format cookie
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.use('/readers',authMiddleware.librarianAuth, readerRoute);
app.use('/books', authMiddleware.librarianAuth, bookRoute);
app.use('/borrowing', authMiddleware.readerAuth, borrowingRoute);
app.use('/viewBorrowReader', authMiddleware.librarianAuth, borrowBookRoute);
app.use('/auth', authRoute)

// index page 
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/library',authMiddleware.librarianAuth, function(req, res) {
    res.render('library');
});
app.get('/logout', function(req, res){
	res.clearCookie("readerId");
	res.redirect('/')
})


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))
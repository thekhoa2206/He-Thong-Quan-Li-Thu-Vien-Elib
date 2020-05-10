const express = require('express')
const port = 3000
var readerRoute = require('./routes/reader.route');
var bookRoute = require('./routes/book.route');
const cookieParser = require('cookie-parser');
var authRoute = require('./routes/auth.route');

const app = express()


var authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieParser('dakshdksajfhdskj')) // use to read format cookie
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.use('/readers',authMiddleware.adminAuth, readerRoute);
app.use('/books', authMiddleware.adminAuth, bookRoute)
app.use('/auth', authRoute)

// index page 
app.get('/', function(req, res) {
    res.render('index');
});
app.get('/library',authMiddleware.adminAuth, function(req, res) {
    res.render('library');
});
app.get('/logout', function(req, res){
	res.clearCookie("readerId");
	res.redirect('/')
})


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))
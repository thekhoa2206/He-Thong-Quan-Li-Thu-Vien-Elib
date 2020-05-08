const express = require('express')
const port = 3000
const app = express()
var readerRoute = require('./routes/reader.route');
var bookRoute = require('./routes/book.route');
const cookieParser = require('cookie-parser');


app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieParser('dakshdksajfhdskj')) // use to read format cookie
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/readers',  readerRoute);


// index page 
app.get('/', function(req, res) {
    res.render('index');
});


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))
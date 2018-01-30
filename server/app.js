const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models').db;
const path = require('path')


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "public")));

// catch 404 (i.e., no route was hit) and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// handle all errors (anything passed into `next()`)
app.use(function(err, req, res, next) {
res.status(err.status || 500);
console.error(err);
res.send("Something went wrong" + err.message);
});

const port = 3000;
app.listen(port, function() {
console.log("The server is listening closely on port", port);
db
    .sync({ force: true })
    .then(function() {
    console.log("Synchronated the database");
    })
    .catch(function(err) {
    console.error("Trouble right here in River City", err, err.stack);
    });
});
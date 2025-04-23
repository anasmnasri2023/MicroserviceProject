var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var veloRouter = require('./routes/veloRoute');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
const PORT = 3000;
var app = express();
const eurekaHelper = require('./eureka-helper');
eurekaHelper.registerWithEureka('RESERVEVELO_MS', PORT);

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI+'/'+process.env.DB_NAME , { autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("success connection with DB"));
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "RESERVEVELO_MS",
      version: "1.0.0",
      description: "Express Project For Bicycle  Microsevice "
    },
    servers: [
      {
        url: "http://localhost:3004"
      }

    ],
  },
  apis: ["./routes/*.js"]
}
const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*'
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/velo', veloRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

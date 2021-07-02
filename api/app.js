var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var mysqlSession = require('express-mysql-session')(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var friendsRouter = require('./routes/friends');
var gamesRouter = require('./routes/games');
var likesRouter = require('./routes/likes');
var commentsRouter = require('./routes/comments');
var chatRouter = require('./routes/chat');
var messagesRouter = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var mysqlSessionStore = new mysqlSession(
  {}, require('./conf/database')
)

app.use(session({
  key: "cookieKey",
  secret: "s9AcWs%vWkxye!r%",
  store: mysqlSessionStore,
  cookie: {secure: false, httpOnly: false, maxAge: 1000 * 86400 * 30},
  resave: false,
  saveUninitialized: false

}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/friends', friendsRouter);
app.use('/games', gamesRouter);
app.use('/likes', likesRouter);
app.use('/comments', commentsRouter);
app.use('/chat', chatRouter);
app.use('/messages', messagesRouter);

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

var http = require('http'),
    path = require('path'),
    methods = require('methods'),
    express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    boc_API = require('./boc_api'),
    sql_scripts = require('./sql_scripts');

// Create global app object
var app = express();





app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'sshh', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));
app.set('view engine', 'pug')
var sess;

app.use("/", require("./routes/index"));
app.use("/bocOauthcb", require("./routes/boc_callback"));

var amount_global = 0;

app.post('/start', function(req,res){
  var url = boc_API.get_app_token(function(url,sub_id) {
    // req.body.amount)
    // console.log(sub_id)
    sess = req.session
    sess.amount = 8
    console.log(req.session.amount)
    res.send(url);
  });
});
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


/// error handlers

  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

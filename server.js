var express = require('express');
var path = require('path');
var dot = require('dot');

var app = express();

var separator = require('./Routes/Separator');
var group = require("./index");
group.train();

app.configure(function() {
    app.set("views", __dirname + "/Views");
    app.use(express.static(__dirname + '/Views/.'));
    app.use(express.bodyParser({uploadDir:path.join(__dirname, '/pictures')}));//allow the req parameter to get data sent by clients
});

app.engine('html', require('ejs').renderFile);

//Routes
//app.get('/', function(req, res){
  //  res.render("index.html");
//});
app.post('/', separator.route);
//app.get('/test', separator.route);


app.listen(80);
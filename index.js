var express = require('express');
var app = express();

app.use('/',express.static('public'));
app.use('/admin',express.static('adminUI'));

var express = require('express');
var compress = require('compression');

var app = express();
app.use(compress());

app.use('/',express.static('public'));
app.use('/admin',express.static('adminUI'));

app.listen(process.env.PORT || 5000);

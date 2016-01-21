var express = require('express');
var app = express();

app.use('/',express.static('public'));
app.use('/admin',express.static('adminUI'));

app.listen(process.env.PORT || 5000);

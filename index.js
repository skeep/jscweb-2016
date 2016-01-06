var express = require('express'),
  fs = require('fs'),
  bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/saveEmail', function(request, respond) {
  filePath = 'assets/emails.txt';
  console.log('saving request', request.body);
  if(request.body && request.body.email) {
    console.log("Request received for",request.body.email);
    fs.appendFile(filePath, '\n' + request.body.email + ",", function() {
      console.log('saved');
    });
  }
  else{
    console.log("Invalid Request Received, Absent Body");
  }
  respond.status(200).send('ok');
});

app.listen(process.env.PORT || 5000);

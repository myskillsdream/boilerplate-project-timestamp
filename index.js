// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
// your first API endpoint... 
app.get("/api/hello", function (req, res) {

  res.json({ greeting : "hello API" });
  
});

app.get("/api/", function (req, res) {

  res.json({
     
      "unix": new Date().getTime(), 
      "utc": new Date().toUTCString()
    
    }); 
  
});

app.get("/api/:date_string", function (req, res) {

  let dateString = req.params.date_string;

  let urlParam = new Date(dateString);

  let passedDate = parseInt(dateString)

  if (urlParam != "Invalid Date") {

    res.json(
      { 
        "unix": urlParam.getTime(), 
        "utc": urlParam.toUTCString()
      
      });

  }
  
  else if (passedDate > 1000) {
    let timeInUnix = new Date(passedDate) 

    res.json({
     "unix": timeInUnix.getTime(), 
     "utc": timeInUnix.toUTCString()
   });

 }
  else{

    res.json({ error : "Invalid Date" });

  }
  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

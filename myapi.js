var http = require('http');
var express = require('express');

var app = express();

var inputs = [ { pin: '11', gpio: '17', value: 1 },
               { pin: '12', gpio: '18', value: 0 } ];

app.configure(function() {
    app.use(express.favicon());
    app.use(express['static'](__dirname ));
});

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res){
    res.send(inputs[req.params.id]);
});

// Express route for any other unrecognised incoming requests
app.get('*', function(req, res){
    res.send('Unrecognised API call', 404);
});
// Express route to handle errors
app.use(function(err, req, res, next){
    if (req.xhr) {
        res.send(500, 'Oops, Something went wrong!');
    }
    else {
        next(err);
    }
});

app.listen(3000);
console.log('App Server running at port 3000');
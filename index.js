const express = require('express');
const app = express();

var cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const Predict = require('./apis/predict');
Predict(app);

const TestAll = require('./apis/testall');
TestAll(app);


//health check

app.get('/', function(req, res) {
    res.send({'result': 'im  0.2.3'});
});


const PORT = 8080;

const server = app.listen(PORT, function() {
    console.log('listenning on port ' + PORT.toString());
});
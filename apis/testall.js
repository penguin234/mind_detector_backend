model = require('../requesters/model-requester');
avgset = require('../requesters/avgset-requester');
center = require('../requesters/center-requester');
const { json } = require('body-parser');
const fetch = require('node-fetch');

function testcon(req, res) {
    function callback(a, b) {
        conc = {'a':a, 'b':b};
        conc.level = 6;
        conc.centers = b.data;
        res.send(conc);
    }


    function midcent(a) {
        centerServer = 'util-center'

        let options = {
            method: 'POST',
            body: JSON.stringify({'province': '경기도_용인시'}),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let fullURL = 'http://' + centerServer + '/province';
    
        fetch(fullURL, options)
            .then(data => data.json())
            .then(data => callback(a, data))
            .catch(err => callback(a, err));
    }


    modelServer = 'model'

    let options = {
        method: 'GET'
    };

    let fullURL = 'http://' + modelServer;
    
    fetch(fullURL, options)
        .then(data => data.json())
        .then(data => midcent(data))
        .catch(err => midcent(err));
}

module.exports = function(app) {
    app.post('/testall', testcon);
}
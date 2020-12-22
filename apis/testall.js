model = require('../requesters/model-requester');
avgset = require('../requesters/avgset-requester');
center = require('../requesters/center-requester');
const fetch = require('node-fetch');

function testcon(req, res) {
    function callback(a, b) {
        res.send({'a':a, 'b':b});
    }


    function midcent(a) {
        centerServer = 'util-center'

        let options = {
            method: 'GET'
        };

        let fullURL = 'http://' + centerServer + '/all';
    
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
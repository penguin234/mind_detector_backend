const fetch = require('node-fetch');

module.exports = function(request, callback) {
    avgSetServer = 'util-avgset'

    let options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        },
    };

    let fullURL = 'http://' + avgSetServer + '/addone';
    
    fetch(fullURL, options)
        .then(data => {
            let status = data.status;
            return [status, data];
        })
        .then(list => {
            list[0] = Number(list[0])
            if (list[0] == 200) {
                return list[1].json();
            }
            return list[1].text();
        })
        .then(data => callback(data))
        .catch(err => callback(data));
}
const fetch = require('node-fetch');

module.exports = function(request) {
    avgGetServer = 'util-avgget'

    let options = {
        method: 'GET'
    };

    let fullURL = 'http://' + avgGetServer + '/all';
    
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
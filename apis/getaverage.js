const avgget = require('../requesters/avgget-requester')

const times = require('../utils/times')

function predict(req, res) {
    model(body, (data) => {
        let conc = {}
        conc.resa = data;
        if (!data.data) {
            data.data = 0.5;
        }
        let percent = data.data * 100;
        let cartegory = [[0,20], [20,40], [40,50], [50,60], [60,67.5], [67.5,75], [75,82.5], [82.5,100]];

        let lv = 0;
        for (lv = 1; percent > cartegory[lv][1]; lv++);

        conc.exact = percent;
        conc.level = lv;

        res.send(conc);
    });
}

module.exports = function(app) {
    app.get('/average', predict);
}
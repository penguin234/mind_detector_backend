const model = require('../requesters/model-requester')
const avgset = require('../requesters/avgset-requester')
const center = require('../requesters/center-requester')

const times = require('../utils/times')

function predict(req, res) {
    body = req.body;
    body.privacy.regidences = body.privacy.province+'_'+body.privacy.city;
    body.privacy.gender = body.privacy.sex;
    let regidences = body.privacy.regidences
    console.log(body);

    model(body, (data) => {
        let conc = {}
        conc.resa = data;
        if (!data.result) {
            data.result = 0.5;
        }
        let percent = data.result * 100;
        let cartegory = [[0,20], [20,40], [40,50], [50,60], [60,67.5], [67.5,75], [75,82.5], [82.5,100]];

        let lv = 0;
        for (lv = 1; percent > cartegory[lv][1]; lv++);

        conc.level = lv;

        center({'province': regidences}, (list) => {
            conc.resb = list;
            if (!list.data) {
                conc.centers = []
            }
            conc.centers = list.data;

            let avgparam = times.currtime();
            avgparam.value = parseInt(percent);

            avgset(avgparam, (avg) => {
                conc.resc = avg;
                if (!avg.data) {
                    conc.curravgval = {};
                }
                conc.curravgval = avg.data;

                res.send(conc);
            });
        });
    });
}

module.exports = function(app) {
    app.post('/predict', predict);
}
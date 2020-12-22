module.exports = {
    currtime: function() {
        const today = new Date();
        const ret = {};

        ret["year"] = today.getFullYear();
        ret["month"] = today.getMonth()+1;
        ret["date"] = today.getDate();
        ret["hour"] = today.getHours();
  
        return ret
    }
}
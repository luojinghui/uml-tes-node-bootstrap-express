
// var _ = require("./lodash.min.js");
var answers = require("./Answer.js");

function calculate(valName,valValue) {
    var answer = answers();
    var getSubScore = 0;

    answer.forEach(function(val) {
        if(val.name === valName && val.value.toString() === valValue.toString()) {
            getSubScore = val.score;
        }
    });
    return getSubScore;
}

function sub_score(answer) {
    var score = 0;

    for(var key in answer) {
        score += calculate(key,answer[key]);
    }
    return score;
}

module.exports = sub_score;

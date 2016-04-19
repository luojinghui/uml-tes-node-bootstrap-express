
var _ = require("./lodash.min.js");
var Answer = require("./Answer.js");

function sub_score(answer) {
    var score = 0;

    for(var key in answer) {
        score += calculate(key,answer[key]);
    }
    return score;
}

function calculate(valName,valValue) {
    var answer = Answer();
    var getSubScore = 0;

    answer.forEach(function(val) {
        if(val.name === valName && val.value.toString() === valValue.toString()) {
            getSubScore = val.score;
        }
    });
    return getSubScore;
}

module.exports = sub_score;

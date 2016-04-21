var Question = require("./question.js");

function Answer() {
    return [
        new Question("umlzhongwen", ["统一建模语言"], 1),
        new Question("objtezheng-1", ["封装性","继承性","多态性"], 1),
        new Question("one_select_1", ["B"], 1),
        new Question("one_select", ["A"], 1),
        new Question("check_box1", ["A","B","D"], 1),
        new Question("check_box2", ["A","B","C"], 1),
        new Question("yongli", ["false"], 1),
        new Question("zhuangtai", ["true"], 1),
        new Question("textArea", ["模型"], 5)
    ];
}

module.exports = Answer;

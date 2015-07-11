var question = require("./question.js");

function Answer() {
    return [
        new question("umlzhongwen", ["统一建模语言"], 1),
        new question("objtezheng-1", ["封装性","继承性","多态性"], 1),
        new question("one_select_1", ["B"], 1),
        new question("one_select", ["A"], 1),
        new question("check_box1", ["A","B","D"], 1),
        new question("check_box2", ["A","B","C"], 1),
        new question("yongli", ["false"], 1),
        new question("zhuangtai", ["true"], 1),
        new question("textArea", ["模型"], 5)
    ];
}

module.exports = Answer;

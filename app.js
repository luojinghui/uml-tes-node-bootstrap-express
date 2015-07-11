var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var Score = require("./public/score.js")

app.engine('.html',ejs.__express);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(logger(‘dev’));
app.use(bodyParser.json());

app.get('/',function(req,res) {
    res.render('index', {});
});

app.post("/sum_score", function(req, res){
    var answer = req.body;
    var score = Score(answer);

    res.send("" + score);
    //
    // res.render('result', {
    //     name : req.body.username,
    //     xuehao : req.body.userxuehao,
    //     banji : req.body.userbanji,
    //     kemu : req.body.userkemu,
    //     score : sum_score
    // });
    res.end();
});

var server = app.listen(3000,function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listen at http://%s:%s' , host, port);
})

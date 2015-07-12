    $("#submit").on("click", function() {
    window.scroll(0, 0);
    judge();

    $.post("/sum_score", $("form").serialize(), function(score) {
        $("#sub_score").prop("value", score);
    })
    //$("#submit").prop("disabled", true);
});

    $("#backtop").on("click",function() {
        window.scroll(30,20);
    })

var addAloneSelectListener = function(name) {
    $(":input").each(function() {
        if (this.name === name) {
            $(this).on("click", function() {
                $("#" + name).prop("value", this.value);
            });
        }
    })
}

var addListenerSelects = function(name) {
    _.forEach(document.getElementsByName(name), function(element) {
        element.addEventListener("click", function() {
            var str = "";
            $(":input").each(function() {
                if (this.name === name) {
                    str += this.checked ? this.value : '';
                }
            })
            $("#" + name).prop("value", str);
        });
    });
}

var listener = function() {
    addAloneSelectListener("one_select_1");
    addAloneSelectListener("one_select_2");
    addListenerSelects("check_box1");
    addListenerSelects("check_box2");
}
listener();

var judge = function() {
    if (document.getElementById("xingming").value == "") {
        alert("请输入姓名");
        event.preventDefault();
    } else if (document.getElementById("banji").value == "") {
        alert("请输入班级");
        event.preventDefault();
    } else if (document.getElementById("xuehao").value == "") {
        alert("请输入学号");
        event.preventDefault();
    }
}


 // var timer = function() {
 //     var ts = (new Date(4000, 11, 11, 9, 0, 0)) - (new Date());
 //     var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
 //     var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
 //
 //     mm = checkTime(mm);
 //     ss = checkTime(ss);
 //     $("#timer").prop("value", mm + "分" + ss + "秒")
 //     setInterval("timer()", 1000);
 // }
 //
 // function checkTime(i) {
 //     if (i < 10) {
 //         i = "0" + i;
 //     }
 //     return i;
 // }
 // timer();

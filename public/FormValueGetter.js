function FormValueGetter() {
    this.NamesAndValues = [];
}

FormValueGetter.prototype.GetValues = function(form) {
    var names = getNames(form);
    NamesAndValues = this.NamesAndValues;

    names.forEach(function(val) {
        NamesAndValues.push(getNameAndValue(val));
    });
    // console.log(NamesAndValues);
};

    var getNameAndValue = function(name) {
        var ValueAndName = {};
        var dgn = document.getElementsByName(name);

        if(dgn[0].type === "text") {
            ValueAndName = {
                name : name,
                value : getTextValue(name)
            };
        }
        if(dgn[0].type === "radio" || dgn[0].type === "checkbox") {
            ValueAndName = {
                name : name,
                value : getSelectValue(name)
            };
        }
        if(dgn[0].type === "textarea") {
            ValueAndName = {
                name : name,
                value : getTextAreaValue(name)
            };
        }
        return ValueAndName;
    };

    var getTextValue = function(name) {
        var array = [];

        [].forEach.call(document.getElementsByName(name),function(val) {
            array.push(val.value);
        });
        return array;
    };

    var getSelectValue = function(name) {
        var array = [];

        [].forEach.call(document.getElementsByName(name),function(val) {
            if(val.checked) {
                array.push(val.value);
            }
        });
        // console.log(array);
        return array;
    };

    var getTextAreaValue = function(name) {
        var array = [];

        [].forEach.call(document.getElementsByName(name),function(val) {
            array.push(val.value);
        });
        return array;
    };

    var getNames = function(form) {
        var names = [];

        [].forEach.call(document.querySelector(form),function(val,i) {
            if(val.name !== "") {
                names.push(val.name);
                }
            });

        names = _.chain(names).groupBy(function(val,n) {
            return val;
            }).map(function(val,key) {
                return key;
            }).value();
        return names;
    };

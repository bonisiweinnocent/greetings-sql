module.exports = function greet(storage) {


    var msg = "";
    var nameStore = {};

    function greetings(message, param) {

        var param1 = param.charAt(0).toUpperCase() + param.slice(1).toLowerCase();
        if (message == "Swahili") {
            msg = 'Jambo, ' + param1;

        } else if
            (message == "French") {
            msg = "Bonjour, " + param1;

        } else if
            (message == "IsiXhosa") {
            msg = "Molo, " + param1;
        }
    }
    function errorSpecial() {

        return "Please type only letters."
    }

    function getMsg() {
        return msg
    }
    function bothError(name, language) {
        if (name === "" && !language) {
            return "Please type in your name and select a language."

        }
    }


    function errorsNoName(name) {
        if (!name) {
            return "Please type in your name below."

        }
    }

    function languageErrors(lang) {
        if (!lang) {
            return "Please select a language."

        }
    }
    function storageError(click) {
        if (click) {
            return "You have successfully cleared your local storage"

        }
    }
    function store(names) {
        if (nameStore[names] === undefined) {
            nameStore[names] = 1
        }
        else {
            nameStore[names]++
        }

    }
    function countNames() {
        var objNames = Object.keys(nameStore)
        return objNames.length
    }
    function timer() {
        return "";
    }
    function storeArray() {
        return nameStore
    }
    function resetBTn() {

    }


    return {
        greetings,
        getMsg,
        errorsNoName,
        languageErrors,
        bothError,
        errorSpecial,
        store,
        countNames,
        timer,
        storeArray,
        storageError,
        resetBTn

    }

}
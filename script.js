module.exports = function greet(pool) {


    var msg = "";
    var nameStore = {};

  async  function greetings(message, param) {

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
    // async function bothError(name, language) {
    //     let empty = await pool.query('')
    //     if (name === "" && !language) {
    //         return empty.rows;

    //     }
    // }


    async function store(userName) {
        let names = await pool.query('INSERT INTO  users(name,counter) VALUES ($1,$2)', [userName, 1])
        return names.rows;
    }
    



    async function countNames() {
        let objNames = await pool.query('SELECT COUNT (*) FROM users')

        return objNames.rowCount;


    }
    function timer() {
        return "";
    }

    async function storeArray() {
        let allNames = await pool.query('SELECT * FROM USERS')
        return allNames.rows;
    }

    async function resetBTn() {
        let reset = await pool.query('DELETE * FROM users')
        return reset.rows;

    }


    return {
        greetings,
        getMsg,
        // errorsNoName,
        // languageErrors,
        // bothError,
        errorSpecial,
        store,
        countNames,
        timer,
        storeArray,
        // storageError,
        resetBTn

    }

}
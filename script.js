module.exports = function greet(pool) {


    var msg = "";


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


    function getMsg() {
        return msg
    }


    async function store(userName) {

        let names = await pool.query('INSERT INTO  users(name,counter) VALUES ($1,$2)', [userName, 1])
        return names.rows;
    }




    async function countNames() {
        let objNames = await pool.query('SELECT DISTINCT name FROM users')

        return objNames.rowCount;


    }

    async function singleName(take) {
        var allRows = take.charAt(0).toUpperCase() + take.slice(1).toLowerCase();
        let duplicate = await pool.query('SELECT * FROM users WHERE name = $1', [allRows])
        if (duplicate.rowCount === 0) {
            await store(allRows)
        } else {
            await updateCounter(allRows)
        }



    }
    async function nameList() {
        let allNames = await pool.query('SELECT name FROM users')

        return allNames.rows;

    }

    async function getCounter(name) {
        const count = await pool.query('select counter from users where name = $1', [name]);
        console.log(count.rows[0])

        return count.rows[0].counter;

    }

    async function updateCounter(name) {
        await pool.query('update users set counter = counter + 1 where name  = $1', [name])
    }
    async function resetBTn() {
        let reset = await pool.query('DELETE FROM users')
        return reset.rows;

    }

    return {
        greetings,
        getMsg,
        store,
        countNames,
        nameList,
        resetBTn,
        getCounter,
        singleName

    }

}
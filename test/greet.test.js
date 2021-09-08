const assert = require('assert');
// const greet = require('../script');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted';

const Greet = require('../script');

const pool = new Pool({
    connectionString
});


describe('The greetings web app', function () {

    beforeEach(async function () {
        console.log("*****");
        await pool.query("delete from users;");
       
    });

    it('should able to store names greeted', async function () {
        let theGreet= Greet(pool);
        await theGreet.store('Mandy');
        assert.deepEqual(1,  await theGreet.countNames());

    });

    it('should able to check the duplication of data entry', async function () {
        let theGreet= Greet(pool);
        await theGreet.store('Mandy');
        await theGreet.store('Mandy');
        await theGreet.store('Mandy');
        assert.deepEqual(1,  await theGreet.countNames());

    });

    it('should able to count names greeted', async function () {
        let theGreet= Greet(pool);
        await theGreet.store('Mandy');
        await theGreet.store('Lorna')
        assert.equal(2,  await theGreet.countNames());

    });

    it('should able to reset the page', async function () {
        let theGreet= Greet(pool);
        await theGreet.storeArray();
        
        assert.equal(0,  await theGreet.resetBTn());

    });
    after(function(){
        pool.end();
    });

});

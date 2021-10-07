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

   
    it('should be able to greet Bonny correctly in  IsiXhosa', function () {
        var theGreet = Greet(pool);
        var word = "Bonny"
        var contain = "IsiXhosa"

        theGreet.greetings(contain, word)
       
        assert.equal("Molo, Bonny", theGreet.getMsg());


    });
    it('should be able to greet Thabo correctly in  French', function () {
        var theGreet = Greet(pool);
        var word = "Thabo"
        var contain = "French"

        theGreet.greetings(contain, word)
       
        assert.equal("Bonjour, Thabo", theGreet.getMsg());


    });
    it('should be able to greet Mila correctly in  Swahili', function () {
        var theGreet = Greet(pool);
        var word = "Thabo"
        var contain = "Swahili"

        theGreet.greetings(contain, word)
       
        assert.equal("Jambo, Thabo", theGreet.getMsg());


    });
    it('should able to store names greeted', async function () {
        let theGreet= Greet(pool);
        await theGreet.store('Mandy');
        assert.deepEqual(1,  await theGreet.countNames());

    });


    it('should able to check the duplication of names greeted', async function () {
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

    it('should be able  to reset the database', async function () {
        let theGreet= Greet(pool);
        // await theGreet.storeArray();
        
        assert.equal(0,  await theGreet.resetBTn());

    });
    after(function(){
        pool.end();
    });
});



// nameList,
// getCounter,
// singleName

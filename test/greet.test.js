const assert = require('assert');
const greet = require('../script');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted';

const pool = new Pool({
    connectionString
});

// describe('The greetings  web app', function(){

//     beforeEach(async function(){
//         console.log("*****");
//         await pool.query("delete from users;");
        
//     });

//     it('should able to store names greeted and the counter', async function(){
//         let greet = greet(pool);
//         await greet.store({
//             description : "Diary"
//         })



        it('should able to store names greeted and the counter', async function(){
            let categoryService = greet(pool);
            await categoryService.store({
               
            });
            let categories = await categoryService.store();
        assert.equal(Mandy, Molo,Mandy);;
        });
// .......................

// describe('The greet App factory function', function () {
//     it('should be able to greet Bonny correctly in  IsiXhosa', function () {
//         var theApp = greet();
//         var word = "Bonny"
//         var contain = "IsiXhosa"

//         theApp.greetings(contain, word)
       
//         assert.equal("Molo, Bonny", theApp.getMsg());


//     });
//     it('should be able to greet Abongile correctly in Swahili', function () {
//         var theApp = greet();
//         var word = "Abongile"
//         var contain = "Swahili"

//         theApp.greetings(contain, word)
       
//         assert.equal("Jambo, Abongile", theApp.getMsg());

//     });
//     it('should be able to greet Marry correctly in French', function () {
//         var theApp = greet();
//         var word = "Marry"
//         var contain = "French"

//         theApp.greetings(contain, word)
       
//         assert.equal("Bonjour, Marry", theApp.getMsg());
//     });

// describe('Error messages', function () {
  
// it('should return "Please type in your name and select a language" message when the greet button is clicked without selecting a language and inputing a name', function () {
//     var theApp4 = greet();
//    var word =""
//    var addLanguage=""
//     assert.equal("Please type in your name and select a language.", theApp4. bothError(word,addLanguage));
// });


// });


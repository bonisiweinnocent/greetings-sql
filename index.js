// define my variables
'use strict';

const flash = require('express-flash');
var session = require('cookie-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greet = require('./script');
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted',

    ssl: {
        useSSL,
        rejectUnauthorized: false
    }
});


const greetApp = greet(pool);
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {

    res.render('index', {
        greets: greetApp.getMsg(),
        // counterRender: greetApp.getName()


    })

})


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.post('/greet', async function (req, res) {
    var msg = ""
    setTimeout(function () {
        msg = greetApp.timer()

    }, 3000);
    
    
    let regEx =  /^[A-Za-z]+$/;
    const enterName = req.body.enterName;
    const language = req.body.language
    if (enterName ==="" && !language) {
        req.flash('info', 'Please type in your name and select a language.');
    }
    else if(enterName  && !language){
        req.flash('info', 'Please  select a language.');  
    }
else if (enterName ==="" && language){
    req.flash('info', 'Please type in your name.');
}
else if(!regEx.test(enterName) && language){
     req.flash('info', 'Only alphabets allowed,please type your name correctly.');
}
    else {
        if (enterName && language) {
            greetApp.greetings(req.body.language, req.body.enterName);
            await greetApp.singleName(enterName)
            msg = greetApp.getMsg()

        }
    }

    res.render('index', { msg, counter: await greetApp.countNames() })
});


app.post('/counterReset',  async function (req, res) {
let reset = req.body.buttonNames
// if (reset) {
//     greetApp.resetBTn(req.body.buttonNames);
//     // req.flash('info', 'Please type in your name and select a language.');
// }
    res.render('index',{reset3: await greetApp.resetBTn()})

});

app.post('/greetings', async function(req, res)  {


    res.render('greetings', { namesGreeted: await greetApp.storeArray() })


})


app.get('/counter/:enterName', async function(req, res)  {
    var name = req.params.enterName
    var namesList = await  greetApp.getCounter(name)

    // console.log(namesList)

    res.render('counter', {
        name: name,
        personsCounter: namesList
    })

})

const PORT = process.env.PORT || 2000;

app.listen(PORT, function () {
    console.log("app started at", PORT)
});
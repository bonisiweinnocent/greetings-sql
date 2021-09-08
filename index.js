// define my variables
'use strict';

const flash = require('express-flash');
const session = require('express-session');
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
const connectionString = process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted';

const pool = new Pool({
    connectionString,
    ssl: useSSL
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
    let regEx =  /^[A-Za-z]+$/;
    const enterName = req.body.enterName;
    const language = req.body.language
    if (enterName === "" && !language) {
        req.flash('info', 'Please type in your name and select a language.');
    }
    else if(enterName ==="" && !language){
        req.flash('info', 'Please  select a language.');  
    }
else if (enterName ==="" && language){
    req.flash('info', 'Please type in your name.');
}
// else if(regEx.test && language){
//     req.flash('info', 'Only alphabets allowed,please type your name correctly');
// }
    else {
        if (enterName && language) {
            greetApp.greetings(req.body.language, req.body.enterName);
            await greetApp.store(enterName)
            msg = greetApp.getMsg()

        }
    }

    res.render('index', { msg, counter: await greetApp.countNames() })
});


app.post('index', function (req, res) {



});

app.post('/greetings', (req, res) => {


    res.render('greetings', { namesGreeted:  greetApp.storeArray() })


})


app.get('/counter/:enterName', (req, res) => {
    var name = req.params.enterName
    var namesList = greetApp.storeArray()

    res.render('counter', {
        name: name,
        personsCounter: namesList[name]
    })

})

const PORT = process.env.PORT || 3051;

app.listen(PORT, function () {
    console.log("app started at", PORT)
});
// define my variables
'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greet = require('./script');
const app = express();
const routes = require('./routes/routes')

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connectiongree
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://bonisiwecukatha:pg123@localhost:5432/names_greeted',
    ssl: { rejectUnauthorized: false }

    // ssl: {
    //     useSSL,
    //     rejectUnauthorized: false
    // }
});


const greetApp = greet(pool);
const Instance = routes(greetApp)
app.use(express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');

app.get('/',Instance.greet5); 
       
        // counterRender: greetApp.getName()



// initialise session middleware - flash-express depends on it
app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.post('/greet',Instance.greet1); 



app.post('/counterReset', Instance.greet2);



app.post('/greetings', Instance.greet3);


app.get('/counter/:enterName', Instance.greet4);

const PORT = process.env.PORT || 2000;

app.listen(PORT, function () {
    console.log("app started at", PORT)
});
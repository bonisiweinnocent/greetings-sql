// define my variables
const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greet = require('./script');
const app = express();
const greetApp = greet();
// const moment =require('moment')
// moment().format();

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


app.post('/greet', function (req, res) {
    var msg = ""
    const enterName = req.body.enterName;
    const language = req.body.language
    if (enterName === "" && !language) {
        req.flash('info', 'Please type in your name and select a language.');
    }
    else {
        if (enterName && language) {
            greetApp.greetings(req.body.language, req.body.enterName);
            greetApp.store(enterName)
            msg = greetApp.getMsg()

        }
    }

    res.render('index', { msg, counter : greetApp.countNames(), })
});


app.post('index', function (req, res) {



});

app.post('/greetings', (req, res) => {


    res.render('greetings', { namesGreeted: greetApp.storeArray() })


    console.log(typeof namesGreeted)
})


app.get('/counter/:enterName', (req, res)=>{
var name = req.params.enterName 
var namesList = greetApp.storeArray()
 
res.render('counter', {
    name: name,
    personsCounter : namesList[name]
})

})

const PORT = process.env.PORT || 3014;

app.listen(PORT, function () {
    console.log("app started at", PORT)
});
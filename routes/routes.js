module.exports = function greetRoutes(param) {

    async function greet1(req, res) {
        var msg = ""


        let regEx = /^[A-Za-z]+$/;
        const enterName = req.body.enterName;
        const language = req.body.language
        try {
            if (enterName === "" && !language) {
                req.flash('info', 'Please type in your name and select a language.');
            }
            else if (enterName && !language) {
                req.flash('info', 'Please  select a language.');
            }
            else if (enterName === "" && language) {
                req.flash('info', 'Please type in your name.');
            }
            else if (!regEx.test(enterName) && language) {
                req.flash('info', 'Only alphabets allowed,please type your name correctly.');
            }
            else {
                if (enterName && language) {
                    greetApp.greetings(req.body.language, req.body.enterName);
                    await greetApp.singleName(enterName)
                    msg = greetApp.getMsg()

                }
            }

            res.render('index', { msg })
        } catch (error) {
            console.log({ error });
            res.redirect('/')
        }

    }
    async function greet2(req, res) {
        let reset = req.body.buttonNames
        if (reset) {
            req.flash('key', 'Database succesfully cleared!');
        }

        res.render('index', { reset3: await greetApp.resetBTn() })

       
    }
    async function greet3(req, res)  {


        res.render('greetings', { namesGreeted: await greetApp.nameList() })
    }
    async function greet4(req, res)  {
        var name = req.params.enterName
        var namesList = await  greetApp.getCounter(name)
    
      
    
        res.render('counter', {
            name: name,
            personsCounter: namesList
        })
    }

    return {
        greet1,
        greet2,
        greet3,
        greet4
    }
}


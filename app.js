const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport');
const bodyparser = require('body-parser')
const multer = require('multer')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload')
const app = express();


//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//Configuring static pages
app.use(express.static(__dirname + '/public'))

//Body-parser
app.use(bodyparser.json())
app.use(express.urlencoded({extended:false}))
//Express Sesion
app.use(session({
    secret:'rollins',
    resave:false,
    saveUninitialized:false
}))
//Connect to flash
app.use(flash())

//Default Options
app.use(fileUpload())

//multer
//app.use(multer)


//Global Variables
app.use(function(request, response, next) {
    response.locals.success_alert_message = request.flash('success_alert_message');
    response.locals.error_message = request.flash('error_message');
    response.locals.error = request.flash('error');
    next();
});

//Initializing the passport
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Router
app.use('/',require('./Routes/index'))
app.use('/users',require('./Routes/users'))

//Logout function
app.delete('/logout', (req,res) =>{
    req.logOut()
    res.redirect('/users/login')
})


//Setting our server
const PORT = process.env.PORT || 8000;
app.listen(PORT,console.log(`Server started at port ${PORT},please stay with me`))
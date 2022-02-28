
const express = require('express')
const router = express.Router();
const loginController = require('../controllers/loginControllers')
const registerController = require('../controllers/registerController')
const passport = require('passport')
const forgotPass = require('../controllers/forgot')
const passportController = require('../controllers/passportController')
const updateDb = require('../controllers/updateDB')
const multer = require('multer')
passportController(passport)


//get login Page
router.get('/login',ChecknotAuthenticated,loginController.getLoginPage)

//Posting login page
router.post('/login',ChecknotAuthenticated, passport.authenticate('local',{
    successRedirect: '/users/home',
    failureRedirect: '/users/login',
    failureFlash: true,
    successFlash:true
}))

//getting home page
router.get('/home',CheckAuthenticated,(req,res)=>{
    res.render('home',{
        user:req.user
    })
})



//Posting Home page
router.post('/home',CheckAuthenticated,(req,res)=>{

}
)

//get register page
router.get('/register',ChecknotAuthenticated,registerController.getRegisterPage)

//Posting register Pag
router.post('/register',ChecknotAuthenticated,registerController.createNewUser)

//update db
router.post('/update',updateDb.updatePassword)

// forgot password page
router.get('/forgotPass',forgotPass.getForgotPage)
router.post('/forgotPass',forgotPass.postForgotPage)

//reset Password
router.get('/resetPass/:id/:token',forgotPass.getResetPage)
router.post('/resetPass/:id/:token',forgotPass.postResetPage)



//Cheking authentication
function CheckAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login')
}

function ChecknotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/home')
    }
   next()
}
module.exports = router

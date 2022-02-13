const express = require('express')
const router = express.Router();
const loginController = require('../controllers/loginControllers')
const registerController = require('../controllers/registerController')
const passport = require('passport')
const forgotPass = require('../controllers/forgot')
const passportController = require('../controllers/passportController')
const updateDb = require('../controllers/updateDB')
//const imageUploadController = require('../controllers/imageUpload')
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

//getting forgot pass
router.get('/forgotPass',(req,res)=>{
    const err = req.flash().error || [];
    res.render('forgotPass',{err})
})

//posting forgot pass
router.post('/forgotPass',forgotPass.resetPasswordLink)


//update db
router.post('/update',updateDb.updatePassword)


//getting the upload photo page
// router.get('/UploadPhoto',(req,res)=>{
//     res.render('fileUpload')
// })

//posting the upload photo page
//const upload = multer({storage:imageUploadController.storageEquip})
//router.post('/UploadPhoto',upload.single('image'),imageUploadController.imageUploader)


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
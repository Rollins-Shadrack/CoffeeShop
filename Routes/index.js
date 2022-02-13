const express = require('express')
const router = express.Router();

router.get('/',ChecknotAuthenticated,(req,res)=>{
    res.render('landingPage')
})
function ChecknotAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/users/home')
    }
   next()
}
module.exports = router
let getLoginPage = (req,res)=>{
    const err = req.flash().error || [];
     res.render('login',{err})
    

}
module.exports = {
    getLoginPage:getLoginPage
}
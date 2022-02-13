 const connection = require('../Database/connectionDB')
 const SendEmail = require('./sendEmailController')
 const randtoken = require('rand-token')
 let sendEmail = SendEmail.sendEmail
 let resetPasswordLink = (req,res,next) =>{
    var email = req.body.email;
    connection.query(`SELECT * FROM userauth WHERE email = ?`,[email],(err,row)=>{
        if(err){console.log(err)}
        
        if(row.length > 0){
            var token = randtoken.generate(20)
            var sent = sendEmail(email,token)
            if(sent != '0'){
                var data ={
                    token:token
                }
                connection.query('UPDATE users SET ? WHERE email ="' + email + '"', data, (err, result)=>{
                    if (err){console.log(err)}
                })
                req.flash('success_alert_message','The reset password Link has been sent to your email address')
            }
            else{
                req.flash('error_message','Something went wrong,please ensure you key in the correct email address')
            }
        }else{
            req.flash('error_message','The email is not registered with us')
        }
        res.redirect('/users/forgotPass')
    })
}
module.exports = {
    resetPasswordLink:resetPasswordLink
}
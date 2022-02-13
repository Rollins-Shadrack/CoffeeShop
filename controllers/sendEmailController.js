const randtoken = require('rand-token')
const nodemailer = require('nodemailer')
function sendEmail  (email,token){
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'', //Your email id
            pass:''  //Your password
        }
    });
    var mailOptions = {
        from:'rshadrackochieng@gmail.com',
        to:email,
        subject:'Reset Password Link - Rolltech.com',
        html:'<p>You Requested for reset password,kindly use this <a href="http://localhost:8000/users/update?token ='+ token +' ">link </a> to reset your password </p>'
    };
    mail.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log("true")
        }else{
            console.log("false")
        }
    })

}
module.exports = {
    sendEmail:sendEmail
}
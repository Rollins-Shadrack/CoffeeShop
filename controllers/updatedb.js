const connection = require('../Database/connectionDB')
const bcrypt = require('bcryptjs')

let updatePassword = (req,res,next) =>{
    var token = req.body.token
    var password = req.body.password
    connection.query('SELECT * FROM userauth WHERE token ="' + token + '"', (err, row)=>{
      if (err){console.log(err)}
      if(row.length > 0){
        const hashedPassword =  bcrypt.hashSync(password,10)
        var data = {
            password:hashedPassword
        }
        connection.query('UPDATE userauth SET ? WHERE email ="' + result[0].email + '"', data, (err, row)=>{
           if(err){console.log(err)}
           
        }) 
        req.flash('success_alert_message','Your Password Has Been Updated Succesfully')
      }
      else{
          req.flash('error_message','Invalid Link,Please Try Again')
      }
      res.redirect('/users/forgotPass')
    })
}
module.exports = {
    updatePassword:updatePassword
}
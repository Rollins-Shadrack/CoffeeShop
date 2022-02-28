 const connection = require('../Database/connectionDB')
 const jwt = require('jsonwebtoken')
 const nodemailer = require('nodemailer')
 const bcrypt = require('bcrypt')

 let errors =[]
 let success = []
let getForgotPage = (req,res) =>{
    res.render('forgotPass')
}

const JWT_SECRET = 'rollins shadrack'
let postForgotPage =(req,res) =>{
    const {email} = req.body
    

    //Checking if the user exists
    const sql = `SELECT * FROM userauth WHERE email = ?`
    connection.query(sql,[email],(err,row)=>{
        if(err) {console.log(err.message)}
        if (row.length > 0){
            //user exists and now we create a json token to last for 15min
            const secret = JWT_SECRET + row[0].password
            const payload = {
                email:email,
                id:row[0].id
            }
            console.log(row[0].id)
            const token = jwt.sign(payload,secret,{expiresIn:'15m'})
            const link = `http://localhost:8000/users/resetPass/${row[0].id}/${token}`
            //console.log(link)
            //res.send('password has been sent to your email')
            let mailTransporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // use SSL
                auth: {
                    user: 'rshadrackochieng@gmail.com',
                    pass: 'dufhbqmcdepbhvdk'
                }
            })
            
            let details = {
                from:'rshadrackochieng@gmail.com',
                to:email,
                subject:'Reset Password Link',
                text:"Reset password Link",
                html:`<p style="color: black;">Hey hi <span style="color: yellowgreen;">${row[0].name}</span> We Have your request to reset your password,
                Kindly click the link below to reset your password</p> <br>
                <h5>Please do note that the link will no longer be helpful after 15 minutes</h5>
                <p>${link}</p><br><br>
                <h4>Thank You</h4>`
            }
            
            mailTransporter.sendMail(details,(err)=>{
                if(err){
                    console.log('it has an error',err)
                }else{
                    success.push({msg:'The reset password Link has been sent to your email address'})
                   res.render('forgotPass',{
                       success
                   })
                }
            })

        }else{
            errors.push({msg:'The email is not registered with us'})
            res.render('forgotPass',{
                errors,
                email
            })
           

        }

    })
}
let getResetPage = (req,res) =>{
    const{id,token} =req.params
console.log(token)
    const sql = `SELECT * FROM userauth WHERE id = ?`
    connection.query(sql,[id],(err,row)=>{
        if(err){console.log(err.message)}
        if(row.length > 0){
            const secret = JWT_SECRET + row[0].password
            try{
                //const payload = jwt.verify(token,secret)
        
                res.render('reset.ejs',{email:row[0].email})
        
            }
            catch(error){
                console.log(error.message)
            }

        }
    })

}
let postResetPage = (req,res)=>{
    const{id,token} =req.params
    const {password,password2} =req.body
     if(password !== password2){
        res.send('Password do not match')
     }

   const sql = `SELECT * FROM userauth WHERE id = ?`
   connection.query(sql,[id],(err,row)=>{
       if(err){console.log(err.message)}
       if(row.length > 0){
        const secret = JWT_SECRET + row[0].password
        try{
            //const payload = jwt.verify(token,secret)
            const hashedPassword = bcrypt.hashSync(password,10)
            const sql2 = `UPDATE userauth SET password = ? WHERE id = ${row[0].id}`
            connection.query(sql2,[hashedPassword],(err,row)=>{
                if(err){console.log(err)}
                res.send('password set successfully')

            })
        }catch(error){
            console.log(error.message)
        }

       }
   })
    

}
module.exports = {
    getForgotPage:getForgotPage,
    postForgotPage:postForgotPage,
    getResetPage:getResetPage,
    postResetPage:postResetPage

}

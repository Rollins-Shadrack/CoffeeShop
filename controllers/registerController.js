const validationResult = require('express-validator')
const registerService = require('../services/registerService')
const connection = require('../Database/connectionDB')
const nodemailer = require('nodemailer')
const bcrypt = require('bcryptjs')
let getRegisterPage = (req,res)=>{
    return res.render('register')

}
let createNewUser = (req,res)=>{
    let image = 'default3.jpg'
    const{name,email,password,password2} = req.body;
    //console.log(req.body)
    let errors = [];
    let success = [];

    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all fields'})
        }
    // check passwords match
    if(password !== password2){
        errors.push({msg:'Passwords do not match'})
     }
     //check passwords length
     if(password.length < 6){
        errors.push({msg:'password should be atleast 6 characters'})
    }

    if(errors.length > 0){
        
       res.render('register',{
           errors,
           name,
           email,
           password,
           password2
       }) 
        // console.log(req.body)
    }
    else{
      //Check to see if the email already exist
      const sql = `SELECT * FROM userauth WHERE email = ?`
      connection.query(sql,email,(err,row)=>{
        if(err){
            throw err
    }
        if(row.length > 0){
            errors.push({msg:'Email Already exists'})
            res.render('register',{
                errors,
                name,
                email,
                password,
                password2
            }) 
            
        }
        else{
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
                subject:'Coffee Shop',
                text:"Welcome to Coffee Shop",
                html:`<h3>Thank You ${name} for choosing Coffee Shop</h3>

                <p class="lead">Here at Coffee Shop we are delighted to be providing you with latest coffee updates and good quality coffee</p>
                
                <h4>Thanks ${name} for the support</h4>`
            }
            
            mailTransporter.sendMail(details,(err)=>{
                if(err){
                    console.log('it has an error',err)
                }else{
                    console.log('email sent')
                    
                   
                }
            })
            const sql2 = `INSERT INTO userauth(name,email,password,image) VALUES(?,?,?,?) `
            const hashedPassword =  bcrypt.hashSync(req.body.password,10)
            connection.query(sql2,[name,email,hashedPassword,image],(err,result)=>{
                if(err){
                    console.log(err)
                }
                if(result){
                    success.push({msg:'Account is Succesfully created'})
                    res.render('login',{
                        success,
                        email,
                        password
                    })

                }
            })
        }
    })
    


    }
}

 
module.exports = {
    getRegisterPage:getRegisterPage,
    createNewUser:createNewUser
}

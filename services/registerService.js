const connection = require('../Database/connectionDB')
const bcrypt = require('bcrypt')

let createNewUser = (user)=>{
    let check = checkUserEmail(user.email)
    console.log(check)


};

// let checkUserEmail = (email) =>{
//    try{
//        connection.query(`SELECT * FROM userauth WHERE email = ?`,email,(err,row)=>{
//            if(err){
//                console.log(err)
//            }
//            if(row > 0){
//                return console.log('true')
//            }
//            else{
//                return console.log('false')
//            }
//        })
//    }catch(e){
//        console.log(e)
//    }
       
    
// }

module.exports = {
    createNewUser:createNewUser
}
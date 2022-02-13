const connection = require('../Database/connectionDB')
let getUserByEmail = (email) =>{
    const sql = `SELECT * FROM userauth WHERE email =${email}`
    connection.query(sql,(err,result)=>{
        if (err){
            console.log(err)
        }
    })
}
let getUserById = (id) =>{
    
}
module.exports ={
    getUserByEmail:getUserByEmail
}
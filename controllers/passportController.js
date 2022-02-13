const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const connection = require('../Database/connectionDB')
function initialize(passport){
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    }, 
    function authenticateUser(req,email,password,done) {
        let errors = []
       
       try{
       let user = connection.query(`SELECT * FROM userauth WHERE email = ?`,[email],(err,row)=>{
            if(err){
                return done(err)
            }
            if(!row.length){
               
                 return done(null, false,req.flash('error_message','Sorry,The user is not registered in our System') ); }
            if(!bcrypt.compareSync(password,row[0].password)){
                
                return done(null, false,req.flash('error_message',"OOOOPS! you've entered a wrong password"));
            }else{
                return done(null, row[0])
            }
        })
    
     
       }catch(e){
        console.log(e)
    }

    }))
   

    //used to serialize the user
    passport.serializeUser((user,done) =>{
        done(null,user.id)
    
    })
    //used to deserialize the user
    passport.deserializeUser((id,done)=>{
        connection.query(`SELECT * FROM userauth WHERE id = ${id}`,(err,row)=>{
            done(err,row[0])
        })
    })

}
module.exports = initialize;
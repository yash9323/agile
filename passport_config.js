const localstratergy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport,getuserbyemail,getuserbyid){
    const  authenticateuser = async (email,password,done) => {
        const user = getuserbyemail(email)
        if (user==null){
            return done(null,false,{message:'no user found'})
        }
        try{
            if (await bcrypt.compare(password,user.password)){
                return done(null,user)
            }
            else{
                return done(null,false,{message:'wrong password'})
            }
        }catch (e){
            return done(e)
        }
    }
    passport.use(new localstratergy({usernameField:'email'},
    authenticateuser))
    passport.serializeUser((user,done)=> done(null,user.id))
    passport.deserializeUser((id,done)=>{
        return done(null,getuserbyid(id))
    })
}

module.exports = initialize
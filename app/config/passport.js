const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

//importing the  model
var Enumerators = require('../models/enumerator_model');

// export the strategy
module.exports = function(passport) {
    
    passport.use(
        new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
            // Match User
            Enumerators.findOne({ username: username })
                .then(enumerator => {
                    // check if a user not existing
                    if(!enumerator) {
                        return done(null, false, { error_msg: 'That username is not registered' });
                    }

                    // match password
                    bcrypt.compare(password, enumerator.password, (err, isMatch) => {
                        if(err) throw err;

                        if(isMatch) {
                            return done(null, enumerator);
                        } else {
                            return done(null, false, { error_msg: 'Username or password is not found'});
                        }
                    });                
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((enumerator, done) => {
        done(null, enumerator.id);
    });
    
    passport.deserializeUser((id, done) => {
        Enumerators.findById(id, (err, enumerator) =>{
            done(err, enumerator);
        });
    });
}

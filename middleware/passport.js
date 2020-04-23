const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'dev-jwt'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({
                    where: {
                        id: payload.userId
                    }
                });
                if(user) {
                    console.log(user);
                    done(null, user)
                } else {
                    console.log('no');
                    done(null, false)
                } 
            } catch (error) {
                console.log(error);
            }
         
        })
    )
}
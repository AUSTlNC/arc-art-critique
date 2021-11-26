const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/google', passport.authenticate('google', {scope: ['openid', 'profile', 'email']}))


router.get(
    '/google/callback', 
    passport.authenticate('google', { failureRedirect: "http://localhost:3000"}),
    function(req, res){
        req.session.isAuth = true,
        req.session.user = req.user,
        res.redirect( "http://localhost:3000")
    }
)

module.exports = router

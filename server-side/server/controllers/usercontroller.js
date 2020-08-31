let router = require('express').Router();
let User = require('../db').import('../models/user');
let validateSession = require('../middleware/validate-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


//INITIAL ROUTE CREATION: DON'T FORGET VALIDATION LATER
router.post('/register', function(req, res){
    const userEntry = {
        username: req.body.user.username,
        passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13)
    }
    User.create(userEntry)
    .then(
        function createSuccess(user){
        //        res.send("This is our user/create endpoint!")/
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

            res.json({
                user: user,
                message: 'User successfully created',
                sessionToken: token
            });
        }
    )
    .catch(err => res.status(500).json({ error: err}))
})

router.post('/login', validateSession, function(req, res){

    User.findOne({ where: { username: req.body.user.username } })
    .then(function loginSuccess(user){
        if(user){
            console.log(req.body.user)
            console.log(user)
            bcrypt.compare(req.body.user.password, user.password, function(err, matches){
                if(matches) {
                   
                    let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'})

                    res.status(200).json({
                        user: user,
                        message: 'User successfully logged in!',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({ error: "Login Failed" });
                }
            })

        } else {
            res.status(500).json({ error: 'User does not exist.' })
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router
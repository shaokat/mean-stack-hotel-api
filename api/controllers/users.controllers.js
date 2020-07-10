const mongoose = require('mongoose')
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {

    const username = req.body.username;
    const name = req.body.name || null;
    const password = req.body.password;
    
    User.create({
        username: username,
        name: name,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    
    },(err, user) => {
        if(err){
        console.log(err);
        res
            .status(400)
            .json(err);
        }else{
            console.log('user created', user);
            res
                .status(201)
                .json(user);
        }
    });
}; 

module.exports.login = (req, res) => {
    console.log('login in user')
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({
        username: username
    }).exec((err, user) => {
        if(err){
            console.log("if")
            console.log(err);
            res
                .status(400)
                .json(err);

        }else if(!user){
            console.log("user not found");
            res
                .status(404)
                .json('User not found');
        }else{
            if(bcrypt.compareSync(password, user.password)){
                console.log('User found', user);
                const token = jwt.sign({username: user.username}, 's3cr3t',{expiresIn: 3600});
                res
                    .status(200)
                    .json({success: true, token: token})
            }else{
                res
                    .status(401)
                    .json('Unauthorized');
            }

        }
    })
};

module.exports.authenticate = function(req, res, next){
    const token = req.headers.authorization;
    if(token){

        console.log(token)
        jwt.verify(token, 's3cr3t', (error, decoded) => {
            if(error){
                console.log(error);
                res
                    .status(401)
                    .json('Unauthorized');
            }else{
                req.user = decoded.username;
                next();
            }
        });
    }else{
        res.status(403).json('No token provided');
    }
}
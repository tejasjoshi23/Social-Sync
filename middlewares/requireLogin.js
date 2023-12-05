const jwt = require("jsonwebtoken")
const {Jwt_secret} = require("../keys")
const mongoose = require('mongoose')
const USER = mongoose.model('USER')

module.exports =(req, res, next)=>{
    // console.log("hello middleware ")
    // console.log(req.headers.authorization);
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error : "You must have log in1 / error from not authorisation middlware"})
    }
    // res.json("ok")
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, Jwt_secret,(err, payload)=>{
        // console.log("this an eroror", err );
        // console.log( "thi is payload",payload);
        // console.log("token lelo",token);
        if(err){
            return res.status(401).json({error : "You must have log in2 / error from not authorisation middlware"})
        }
        const {_id} = payload
        USER.findById(_id).then(userData=>{
            req.user = userData
             //console.log(userData)
            next()
        })
    })   

}
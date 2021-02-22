const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user, payload) =>{
            if(err) return res.status(400).json({msg: "Invalid Authentication"})
            // const {_id} = payload
            // User.findById(_id).then(userData => {
            //     req.user = userData
            //     next()
            // })
           req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth
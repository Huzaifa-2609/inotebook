const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser=require("../middleware/fetchUser");

const JWT_SECRET = "Iamagoodbou";
const {
    body,
    validationResult
} = require('express-validator');

// Route1: Create a user using POST "api/auth/createuser": No login required

router.post("/createuser", [
    body('name', 'Enter a valid name').isLength({
        min: 3
    }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password Must be at least 5 charachters").isLength({
        min: 5
    }),
], async (req, res) => {
    let success=false; 

    //If email already exists then show the bad message and error
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) {
        return res.status(400).json({success,
            message: "The user with the same email already exists"
        });
    }

    //If error occured send a bad message and errors
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success,
                errors: errors.array()
            });
        }
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(req.body.password, salt);


        //Create user in database
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        //authentication Token
        const data = {
            user: {
                id: user.id
            }
        }
        success=true;
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({
            success,
            authToken
        });
        //   .then(user => res.json(user))
        //   .catch(err=>{
        //       console.log(err)
        //       res.send({
        //           error:"please enter a unique value for email",
        //           message:err.message
        //       })
        //   })
        // res.json(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})
//ROUTE:2 Login a user using POST "api/auth/login": No login required
router.post("/login", [

    body('email', "Enter a valid email").isEmail(),
    body('password', "password can not be blank").exists()
], async (req, res) => {
     let success=false; 
    //If email already exists then show the bad message and error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        email,
        password
    } = req.body;
    try {
        let user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(400).send({success,error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).send({success,error:"Please try to login with correct credentials"})
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({
            success,
            authToken
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error occured ")
    }
})
//ROUTE:3 Get a user using POST "api/auth/getuser": No login required
router.post("/getuser",fetchUser, async (req, res) => {
try {
        const userid=req.user.id;
        const user= await User.findById(userid).select("-password");
        res.send(user)
    
    } catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error occured ")
    }
    })


module.exports = router;
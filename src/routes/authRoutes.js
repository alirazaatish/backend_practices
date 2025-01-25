const express = require('express');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const router = express.Router();

const SECRET_KEY = "secret_key_token";

const { signupSchema , loginSchema }  = require('../schema/authSchema')

router.post('/signup', async(req, res, next)=>{
    const { error } = await signupSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: 'Validation Error',
      details: error.details.map((detail) => detail.message),
    });
  }else{
    const data = req.body;
    Object.keys(data).forEach(key => {
    console.log(key, data[key]);
});
    console.log(req.body);
    res.status(200).send('User signed up successfully!');

  }
});

const users = [
  {email: "aliraza@gmail.com", password: "ali123"},
  {email: "alishba@gmail.com", password: "alishba123"}
]

router.get('/login', (req, res, next)=>{
    const {error}= loginSchema.validate(req.body);
    const { email, password } = req.body
    if(error){
        console.log(error.details);
        return res.status(400).send('Valtidation Error During Login');
    }else{
        // const data= req.body;
        // Object.keys(data).forEach((key)=>{
        //     console.log(key, data[key]);
        // })
        // res.status(200).send('User Sucessfully Login');
        console.log("User sucessfully validated!!");
    }

    const user = users.find((u)=>{
      return u.email === email && u.password===password;
    })
    console.log("Email and Password From Req:", email, password);
    console.log("User: ", user)

    if(!user){
      return res.status(400).json({message: "Invalid email and password!"});
    }
    //CREATE JWT TOKEN
    const token = jwt.sign(
      {email: req.body.email , password: req.body.password},
      SECRET_KEY,
      {expiresIn: '1h'}
    );

    res.json({message: 'User Sucessfully Login With Token', token});
});

// router.get('/profile', )

router.get('/profile', (req, res)=>{
  const token = req.headers['authorization'];
  console.log("Token", token);
  if(!token){
    return res.status(401).json({message: " Access Denied. No token Provide"})
  }
  else{
    return res.status(200).json({message: "Acess granted!"})
  }
})


module.exports = router;
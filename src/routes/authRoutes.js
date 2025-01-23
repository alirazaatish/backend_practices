const express = require('express');
const joi = require('joi');
const router = express.Router();

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

router.get('/login', (req, res, next)=>{
    const {error}= loginSchema.validate(req.body);
    
    if(error){
        console.log(error.details);
        return res.status(400).send('Valtidation Error During Login');
    }else{
        const data= req.body;
        Object.keys(data).forEach((key)=>{
            console.log(key, data[key]);
        })
        res.status(200).send('User Sucessfully Login');
    }
})




module.exports = router;
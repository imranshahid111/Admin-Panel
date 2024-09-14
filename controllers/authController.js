import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer } = req.body;

    if(!name){
      return res.status(400).json({
        success: false,
        message: 'name are required',
      });}
      if(!email){
        return res.status(400).json({
          success: false,
          message: 'email are required',
        });}
        if(!password){
          return res.status(400).json({
            success: false,
            message: 'password are required',
          });}
          if(!phone){
            return res.status(400).json({
              success: false,
              message: 'phone are required',
            });}
            if(!address){
              return res.status(400).json({
                success: false,
                message: 'address are required',
              });}
              if(!answer){
                return res.status(400).json({
                  success: false,
                  message: 'answer are required',
                });}

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: 'User already registered',
      });
    }

  
    const hashedPassword = await hashPassword(password);

    
    const user = new User({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    });
    await user.save();
  

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user,
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({
      success: false,
      message: 'Error in registration',
      error: error.message,
    });
  }
};

export const loginController = async (req , res) =>{
  try {
    const {email , password} = req.body
    if(!email || !password)
    {
      return res.status(404).send({
        success: false,
        message:'Invalid Email or Password'
      })
    }
const user = await User.findOne({email})
if(!user){
  return res.status(404).send({
    success: false,
    message : 'Email is not registered'
  })
}
    const match = await comparePassword(password , user.password)
    if(!match){
      return res.status(200).send({
        success : false,
        message : 'Invalid password',
      })
    }
    const token  = await jwt.sign({_id: user._id}, process.env.JWT_SECRET,{
      expiresIn : "7d",
    }); 
    res.status(200).send({
      success : true,
      message : 'login Successful',
      user:{
        name: user.name,
        email : user.email,
        phone : user.phone,
        address : user.address,
        role : user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message : 'Error in login',
      error
    })
  }

}




export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    
    const user = await User.findOne({ email, answer });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const testController = (req , res) =>{
res.send("protected")};
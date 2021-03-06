import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc   Auth user & get token
// @route  GET /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
   				_id: user._id,
   				name: user.name,
   				email: user.email, 
   				isAdmin: user.isAdmin, 
   				token: generateToken(user._id),
        })
    } else {
    	res.status(401)
    	throw new Error('Invalid Email or Password')
    }
})


// @desc   Register new user
// @route  GET /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body
        console.log(name)
    const userExists = await User.findOne({ email })

    if(userExists) {
    	 res.status(400)
    	 throw new Error('User already exists')
    } 

    const user = await User.create({
    	name, 
    	email,
    	password
    })

    if(user) {
    	 res.status(201).json({
     			_id: user._id,
   				name: user.name,
   				email: user.email, 
   				isAdmin: user.isAdmin, 
   				token: generateToken(user._id),

    	 })
    } else {
    	res.status(401)
    	throw new error('Invalid user data')
    }
})


// @desc   Get User Profile
// @route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  
   const user = await User.findById(req.user._id )

   if(user) {
   	  res.json({
          _id: user._id,
   				name: user.name,
   				email: user.email, 
   				isAdmin: user.isAdmin, 
   	  })
   } else {
	   	res.status(404)
	   	throw new Error('User not found')
   }
})



export {authUser, getUserProfile, registerUser}
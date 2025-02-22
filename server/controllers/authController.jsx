const User = require("../models/user")
const {hashPassword,comparePassword} = require("../helpers/auth")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

const registerUser = async(req,res) =>
{

    try {
        const {name,email,password} = req.body;
        //check if user already exists
        if (!name)
        {
            return res.json({
                error: "Name is required",
            })
        }
        if (!password || password.length < 6)
        {
            return res.json({
                error: "Password is required and should be at least 6 characters long",
            })
        }
        const exist = await User.findOne({email})
        if(exist)
        {
            return res.json({
                error: "email already exists",
            })
        }
        const hashedPassord = await hashPassword(password)
        
        const user = new User({name,email,password:hashedPassword})

        await user.save()

        return res.json(user)
} catch(error)
{
        console.log(error)
}
}

const loginUser = async(req,res) => 
{
try
{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (!user)
    {
        return res.json({
            error: "No user found"
        })
    }
    
    const match = await comparePassword(password,user.password)
    if(match)
    {
    jwt.sign(
    {email:user.email, id:user._id, name: user.name},
    process.env.JWT_SECRET,
    {expiresIn: "1h"},
    (err,token) =>
    {
        if(err)
        {
            console.error("JWT Error:",err)
            return res.status(500).json({error: "Token generation failed"})
        }
        res.cookie("token",token,{
            httpOnly: true,
            sameSite: "strict",
            })
            .json({message: "Login successful",user})
    }
    ) 
    }
    if(!match)
    {
        res.json({error:"passwords do not match",})
    }
} catch(error)
{
    console.log(error)
}
}

const logoutUser = async(req,res) =>
{
    res.clearCookie("token")
    res.json({message: "Logout successful"})
}

// Handle exports to other part of application
module.exports = {
	registerUser,
	loginUser,
	logoutUser,
};
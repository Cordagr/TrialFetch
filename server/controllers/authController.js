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
        
        const user = new User({name,email,password:hashedPassord})

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



const getProfile = (req, res) => {
    //extract the token from the cookies
    const { token } = req.cookies;
    if (token) {
        //verifying token using the secret key
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
            if (err) {
                console.error("JWT Error:", err);
                return res.status(500).json({ error: "Token verification failed" });
            }
            try {
                //fetch the user details from the database
                const user = await UserModel.findById(decoded.id).select("name email shortdesc longdesc avatar background firstname lastname");
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                //good practices
                console.log("Fetched user data:", user);
                res.json(user);
            } catch (error) {
                //good practices
                console.error("Database Error:", error);
                res.status(500).json({ error: "Failed to fetch user profile" });
            }
        });
    } else {
        //good practices
        res.status(401).json({ error: "No token provided" });
    }
};

//function to update users profile information 
const updateUser = (req, res) => {
    //destructure the id and newdetails from the request body
    const {userId, newDetails} = req.body;

    //userModel is used to find the user by id and update other info
    UserModel.findByIdAndUpdate(userId, newDetails, {new: true})
    .then(updatedUser => {
        // If the update is successful, send a JSON response with the updated user information
        res.json({
          success: true,
          message: "User updated successfully",
          user: updatedUser,
        });
      })
      .catch(error => {
        // If there's an error, send a 500 status code and a JSON response with the error message
        res.status(500).json({
          success: false,
          message: "Error updating user",
          error: error.message,
        });
      });
};
// Handle exports to other part of application
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateUser,
};

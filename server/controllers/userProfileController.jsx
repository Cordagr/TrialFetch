const User = require("../models/user")
//const userProfileModel = require("../models/user")

const getUserProfile = async(req,res) =>
{
try
{
    const {userId} = req.body
    const userProfile = await User.findById(userId)
    if(!userProfile)
    {
        return res.status(404).json({message:"User profile not found"})
    }
    res.status(200).json(User)
}   catch(error)
{
    res.status(500).json({error:error.message})
}
}

const updateUserProfile = async(req,res) =>
{
    try
    {
        const {userId} = req.body
        const {name,location,profilePicture} = req.body

        const updatedProfile = await User.findByIdAndUpdate(userId,
            {name,location,profilePicture},
            {new:true}
        )
        if(!updatedProfile)
        {
            return res.status(404).json({message:"User profile not found"})
        }
        res.status(200).json(updatedProfile)
    }   catch(error)
    {
        res.status(500).json({error:error.message})
    }
}

const deleteUserProfile = async(req,res) =>
{
    try
    {
        const {userId} = req.body
        const deletedProfile = await User.findByIdAndDelete(userId)
        if(!deletedProfile)
        {
            return res.status(404).json({message:"User profile not found"})
        }
        res.status(200).json({message:"User profile deleted successfully"})
    }   catch(error)
    {
        res.status(500).json({error:error.message})
    }
}

// Favorite Trail Function // 
const addFavoriteTrail = async(req,res) =>
{
try 
{
    const {userId, googlePlaceId} = req.body
    const user = await User.findById(userId)
    if(!user)
    {
        return res.status(404).json({message:"User not found"})
    }

    if (!user.favoriteTrails.includes(googlePlaceId))
    {
        user.favoriteTrails.push(googlePlaceId)
        await user.save()
    }
    res.status(200).json({message:"Trail added to favorites", favoriteTrails:user.favoriteTrails})
    }catch(error)
    {
    res.status(500).json({error: "Failed to add to favorite trails"})
    }
}


const removeFavoriteTrail = async(req,res) =>
{
try
{
const {userId, googlePlaceId} = req.body
const user = await User.findById(userId)
if(!user)
{
    return res.stus(404).json({message:"User not found"})
}
user.favoriteTrails = user.favoritTrails.filter(id => id !== googlePlaceId)
await user.save()
} 
catch(error)
{
return res.status(500).json({erorr:"Failed to remove from favorite trails"})
}
}

// Get tuple of favorited trails // 
const getFavoriteTrails = async(req,res) =>
{
    try
    {
        const{userId} = req.params
        const user = await User.findById(userId)
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        
        res.status(200).json({favoriteTrails: user.favoriteTrails})
    } 
    catch(error)
    {
    res.status(500).json({error:"Failed to fetch favorite trails"})
    }
    }


const  createUserProfile = async(req,res) =>
{
    try
    {
        const {name,location,profilePicture} = req.body

        const newProfile = new userProfileModel({
            name,
            location,
            profilePicture
        })

        await newProfile.save()
        res.status(201).json(newProfile)
    }   catch(error)
    {
        res.status(500).json({error:error.message})
    }
}


module.exports = 
{
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    createUserProfile,
}
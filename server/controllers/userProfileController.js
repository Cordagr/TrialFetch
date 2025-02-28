const UserModel = require("../models/user")

const getUserProfile = async (req, res) =>
{
try
{
    const {userId} = req.body
    const userProfile = await UserModel.findById(userId)
    if(!userProfile)
    {
        return res.status(404).json({ message: "User profile not found" })
    }
    res.status(200).json(userProfile)
}   catch(error)
{
    res.status(500).json({error:error.message})
    console.error('Error fetching user profile:', error);
}
}

const updateUserProfile = async (req, res) =>
{
    try
    {
        const { userId } = req.body
        const {name,location,profilePicture} = req.body

        const updatedProfile = await UserModel.findByIdAndUpdate(userId,
            {name,location,profilePicture},
            {new:true}
        )
        if(!updatedProfile)
        {
            return res.status(404).json({ message: "User profile not found" })
        }
        res.status(200).json(updatedProfile)
    }   catch(error)
    {
        res.status(500).json({error:error.message})
        console.error('Error updating user profile:', error);
    }
}

const deleteUserProfile = async (req, res) =>
{
    try
    {
        const { userId } = req.body
        const deletedProfile = await UserModel.findByIdAndDelete(userId)
        if(!deletedProfile)
        {
            return res.status(404).json({message:"User profile not found"})
        }
        res.status(200).json({message:"User profile deleted successfully"})
    }   catch(error)
    {
        res.status(500).json({error:error.message})
        console.error('Error deleting user profile:', error);
    }
}

const addFavoriteTrail = async (req, res) =>
{
try 
{
    const { userId, googlePlaceId } = req.body
    const user = await UserModel.findById(userId)
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
    console.error('Error adding favorite trail:', error);
    }
}


const removeFavoriteTrail = async (req, res) =>
{
try
{
const { userId, googlePlaceId } = req.body
const user = await UserModel.findById(userId)
if(!user)
{
    return res.status(404).json({message:"User not found"})
}
user.favoriteTrails = user.favoriteTrails.filter(id => id !== googlePlaceId)
await user.save()
res.status(200).json({message:"Trail removed from favorites", favoriteTrails:user.favoriteTrails})
} 
catch (error)
{
return res.status(500).json({error:"Failed to remove from favorite trails"})
console.error('Error removing favorite trail:', error);
}
}

const getFavoriteTrails = async (req, res) =>
{
    try
    {
        const{userId} = req.params
        const user = await UserModel.findById(userId)
        if(!user)
        {
            return res.status(404).json({message:"User not found"})
        }
        
        res.status(200).json({favoriteTrails: user.favoriteTrails})
    } 
    catch(error)
    {
    res.status(500).json({error:"Failed to fetch favorite trails"})
    console.error('Error fetching favorite trails:', error);
    }
}


const  createUserProfile = async(req,res) =>
{
    try
    {
        const {name,location,profilePicture} = req.body

        const newProfile = new UserModel({
            name,
            location,
            profilePicture
        })

        await newProfile.save()
        res.status(201).json(newProfile)
    }   catch(error)
    {
        res.status(500).json({error:error.message})
        console.error('Error creating user profile:', error);
    }
}


module.exports = 
{
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    createUserProfile,
    addFavoriteTrail,
    removeFavoriteTrail,
    getFavoriteTrails
}

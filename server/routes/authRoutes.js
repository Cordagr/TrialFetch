const express = require('express')
const router = express.Router()
const cors = require('cors')

const {
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateUser,

} = require("../controllers/authController")

// Middleware //

router.use(cors({
    credentials: true,
    origin: "https://trial-fetch.vercel.app",
}))

//router.get("/", test)
router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("logout",logoutUser)
router.get("/profile", getProfile)
router.put("/update", updateUser)

module.exports = router
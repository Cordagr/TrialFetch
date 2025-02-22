const express = require('express')
const router = express.Router()
const cors = require('cors')

const {

    createTrail,
    getTrail,
    updateTrail,
    deleteTrail,
    searchTrails,

} = require("../controllers/trailController")

// Middleware //

router.use(cors({
    credentials: true,
    origin: "https://trial-fetch.vercel.app",
}))


router.post("/createTrail", createTrail)
router.post("/deleteTrail", deleteTrail)
router.get("/getTrail", getTrail)
router.get("/searchTrails", searchTrails)
router.put("/updateTrail", updateTrail)

module.exports = router
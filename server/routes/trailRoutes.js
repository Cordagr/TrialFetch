const express = require('express')
const router = express.Router()
const cors = require('cors')

const {
    createTrail,
    getTrail,
    updateTrail,
    deleteTrail,
    searchTrails,
    searchPlacesProxy
} = require("../controllers/trailController")

// Middleware //

router.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://trail-fetch.vercel.app"],
}))


router.post("/createTrail", createTrail)
router.post("/deleteTrail", deleteTrail)
router.get("/getTrail", getTrail)
//// router.get("/searchTrails", searchTrails)
router.get("/searchPlaces", searchPlacesProxy)
router.put("/updateTrail", updateTrail)

module.exports = router

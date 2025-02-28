const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, deleteUserProfile, createUserProfile, addFavoriteTrail, removeFavoriteTrail, getFavoriteTrails } = require('../controllers/userProfileController');

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.delete('/profile', deleteUserProfile);
router.post('/profile', createUserProfile);
router.post('/favorite', addFavoriteTrail);
router.delete('/favorite', removeFavoriteTrail);
router.get('/favorites/:userId', getFavoriteTrails);

module.exports = router;

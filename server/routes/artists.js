const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');

router.get('/artists', artistController.getAllArtists);

router.post('/artists', artistController.addArtists);

router.get('/artists/search', artistController.getArtists);

router.delete('/artists/:id', artistController.deleteArtists)

module.exports = router;

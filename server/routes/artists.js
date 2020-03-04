const express = require("express");

const router = express.Router();

const artistController = require("../controllers/artistController");

router.get("/artists", artistController.getAllArtists);

router.post("/artists", artistController.addArtists);

router.get("/artists/search", artistController.getArtists);

router.post("/artists/delete/:id", artistController.deleteArtists);

router.post("/logout", artistController.logout);

module.exports = router;

const express = require('express');
const Cntrl = require('../controllers/artist');

const router = express.Router();

router.post('/add', Cntrl.createArtist);
router.put('/update/:id', Cntrl.updateArtist);
router.get('/get/:id', Cntrl.getArtistById);
router.get('/get', Cntrl.getArtists);
router.delete('/delete/:id', Cntrl.deleteArtist);

module.exports = router;

const express = require('express');
const Cntrl = require('../controllers/song');

const router = express.Router();

router.post('/add', Cntrl.createSong);
router.put('/update/:id', Cntrl.updateSong);
router.get('/get/:id', Cntrl.getSongById);
router.get('/get', Cntrl.getSongs);
router.get('/getbylikes', Cntrl.getSongsByLikes);
router.get('/getbyviews', Cntrl.getSongsByViews);
router.get('/getbyartist/:id', Cntrl.getSongsByArtist);
router.delete('/delete/:id', Cntrl.deleteSong);

module.exports = router;

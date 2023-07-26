const express = require('express');
const router = express();

const User = require('./user');
const Artist = require('./artist');
const Song = require('./song');

router.use('/user', User);
router.use('/artist', Artist);
router.use('/song', Song);

module.exports = router;

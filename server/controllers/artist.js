const Artist = require('../models/artist');
const Song = require('../models/song');

createArtist = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide an Artist',
    });
  }
  const artist = new Artist(body);

  if (!artist) {
    return res.status(400).json({success: false, error: err});
  }
  artist
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: artist._id,
        message: 'Artist added!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Artist already exists!',
      });
    });
};

updateArtist = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  Artist.findOne({_id: req.params.id}, (err, artist) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Artist not found!',
      });
    }
    if (body.imageURL) artist.imageURL = body.imageURL;
    if (body.name) artist.name = body.name;
    artist
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: artist._id,
          message: 'Artist details updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Artist details not updated!',
        });
      });
  });
};

deleteArtist = async (req, res) => {
  Artist.findOneAndDelete({_id: req.params.id}, (err, artist) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!artist) {
      return res.status(404).json({success: false, error: `Artist not found`});
    }
    return res.status(200).json({success: true, data: artist});
  })
    .clone()
    .catch(err => console.log(err));
};

getArtistById = async (req, res) => {
  Artist.findOne({_id: req.params.id}, (err, artist) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!artist) {
      return res.status(404).json({success: false, error: `Artist not found`});
    }
    return res.status(200).json({success: true, data: artist});
  })
    .clone()
    .catch(err => console.log(err));
};

getArtists = async (req, res) => {
  Artist.find({}, (err, artists) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!artists.length) {
      return res.status(404).json({success: false, error: `Artists not found`});
    }
    return res.status(200).json({success: true, data: artists});
  })
    .sort({name: 1})
    .clone()
    .catch(err => console.log(err));
};

module.exports = {
  createArtist,
  updateArtist,
  getArtistById,
  getArtists,
  deleteArtist,
};

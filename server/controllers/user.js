const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

generateToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '30d'});
};

loginUser = async (req, res) => {
  const {username, password} = req.body;
  const token = req.cookies.jwt_token;
  var loggedInUser = null;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log('decoded', decoded);
    if (decoded) {
      loggedInUser = decoded.id;
    }
  });
  if (loggedInUser === null) {
    try {
      const user = await User.findOne({_id: username});
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({message: 'Invalid password'});
      }
      const currentTime = Date.now();
      user.lastLogin = currentTime;
      await user.save();
      const token = generateToken({
        user: user._id,
        isAdmin: user.isAdmin,
      });
      res.clearCookie('jwt_token');
      res.cookie('jwt_token', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
      });
      loggedInUser = {user: user._id, isAdmin: user.isAdmin};
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: 'Server error'});
    }
  }
  return res.status(200).json({
    ...loggedInUser,
  });
};

logoutUser = (req, res) => {
  res.clearCookie('jwt_token');
  return res.status(200).json({
    message: 'User logged Out',
  });
};

createUser = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a User',
    });
  }
  body.isAdmin = false;

  const user = new User(body);
  if (!user) {
    return res.status(400).json({success: false, error: err});
  }
  user.password = bcrypt.hashSync(
    body.password,
    bcrypt.genSaltSync(saltRounds),
  );
  user
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: user._id,
        message: 'Account created!',
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Account already exists!',
      });
    });
};

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  User.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'User not found!',
      });
    }
    if (body.email) user.email = body.email;
    if (body.password)
      user.password = bcrypt.hashSync(
        body.password,
        bcrypt.genSaltSync(saltRounds),
      );
    if (body.isAdmin) user.isAdmin = body.isAdmin;
    if (body.addfavourite) user.favourites.push(body.addfavourite);
    if (body.removefavourite) {
      user.favourites = user.favourites.filter(function (item) {
        return item._id.toString() !== body.removefavourite;
      });
    }
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user._id,
          message: 'Account details updated!',
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Account Details not updated!',
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findOneAndDelete({_id: req.params.id}, (err, user) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!user) {
      return res.status(404).json({success: false, error: `User not found`});
    }

    return res.status(200).json({success: true, data: user});
  })
    .clone()
    .catch(err => console.log(err));
};

getUserById = async (req, res) => {
  await User.findOne({_id: req.params.id}, (err, user) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }
    if (!user) {
      return res.status(404).json({success: false, error: `User not found`});
    }
    return res.status(200).json({success: true, data: user});
  })
    .clone()
    .catch(err => console.log(err));
};

getUsers = async (req, res) => {
  await User.find({}, (err, users) => {
    if (err) {
      return res.status(400).json({success: false, error: err});
    }

    if (!users.length) {
      return res.status(404).json({success: false, error: `User not found`});
    }
    return res.status(200).json({success: true, data: users});
  })
    .clone()
    .catch(err => console.log(err));
};

getCurrentUser = async (req, res) => {
  const token = req.cookies.jwt_token;
};

module.exports = {
  loginUser,
  logoutUser,
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById,
  getCurrentUser,
};

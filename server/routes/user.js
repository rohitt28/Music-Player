const express = require('express');
const Cntrl = require('../controllers/user');

const router = express.Router();

router.put('/login', Cntrl.loginUser);
router.put('/logout', Cntrl.logoutUser);
router.post('/add', Cntrl.createUser);
router.put('/update/:id', Cntrl.updateUser);
router.delete('/delete/:id', Cntrl.deleteUser);
router.get('/get/:id', Cntrl.getUserById);
router.get('/get', Cntrl.getUsers);
router.get('/getCurrent', Cntrl.getCurrentUser);

module.exports = router;

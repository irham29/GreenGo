const express = require("express");
const router = express.Router();

const DashboardController = require("../app/controllers/user/DashboardController");
const HistoryController = require("../app/controllers/user/HistoryController");
const DonateController = require("../app/controllers/user/DonateController");
const MessageController = require("../app/controllers/user/MessageController");

const { checkUserLevel, checkAdminLevel } = require('../middlewares/authMiddleware');
router.get('/', (req, res) => {
  if (req.session.user && req.session.user.level === 'Admin') {
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/dashboard');
  }
});
// Route untuk halaman dashboard
router.get('/dashboard', checkUserLevel, DashboardController.index);
router.get('/profile', checkUserLevel, DashboardController.profile);
router.post('/changePassword', checkUserLevel, DashboardController.changePassword);

// Route untuk halaman history
router.get('/history', checkUserLevel, HistoryController.index);
router.post('/donate/delete/:id', checkUserLevel, HistoryController.deleteDonation);
router.post('/donate/update/:id', checkUserLevel, HistoryController.updateDonation);

// Route untuk halaman konfirmasi donasi
router.get('/donate', checkUserLevel, DonateController.index);
router.post('/storeDonation', checkUserLevel, DonateController.storeDonation);

// Route untuk halaman user
router.get('/message', checkUserLevel, MessageController.index);
router.post('/messageSend', checkUserLevel, MessageController.send)

module.exports = router;
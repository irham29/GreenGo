const express = require("express");
const router = express.Router();

const DashboardController = require("../app/controllers/admin/DashboardController");
const HistoryController = require("../app/controllers/admin/HistoryController");
const ConfirmController = require("../app/controllers/admin/ConfirmController");
const UserController = require("../app/controllers/admin/UserController");

const { checkUserLevel, checkAdminLevel } = require('../middlewares/authMiddleware');

// Route untuk halaman dashboard
router.get('/dashboard', checkAdminLevel, DashboardController.index);

// Route untuk halaman history
router.get('/history', checkAdminLevel, HistoryController.index);

// Route untuk halaman konfirmasi donasi
router.get('/confirm', checkAdminLevel, ConfirmController.index);
// Route untuk menerima donasi
router.post('/donation/:id/accept', checkAdminLevel, ConfirmController.acceptDonation);
// Route untuk menolak donasi
router.post('/donation/:id/reject', checkAdminLevel, ConfirmController.rejectDonation);


// Route untuk halaman user
router.get('/user', checkAdminLevel, UserController.index);
// DELETE User
router.post('/user/delete/:id', checkAdminLevel, UserController.deleteUser);
// POST Edit User
router.post('/user/edit/:id', checkAdminLevel, UserController.editUser);


module.exports = router;
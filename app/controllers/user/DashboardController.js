const Donation = require('../../models/donation');
const User = require('../../models/user');

module.exports = {
  index: async(req, res) => {
    try {
      const donations = await Donation.find({status: "Berlansung"}).populate('user', '_id');
      res.render('user/dashboard', {
        title: "ReDonate",
        layout: "layouts/layout",
        donations,
        session: req.session,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  profile: async (req, res) => {
    user = req.session.user;
    try {
      res.render('user/profile', {
        title: "Profile",
        layout: "layouts/layout",
        user,
        session: req.session,
      });
    } catch (err) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  changePassword: async (req, res) => {
    const { newPassword } = req.body;
  
    try {
      // Cari pengguna berdasarkan ID atau informasi lainnya
      const user = await User.findById(req.session.user._id);
  
      // Ubah kata sandi pengguna
      user.password = newPassword;
      await user.save();
  
      // Redirect ke halaman sukses
      return res.redirect('/profile');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },


}
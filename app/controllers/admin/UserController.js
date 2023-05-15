const Donation = require('../../models/donation');
const User = require('../../models/user');

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.find();
      res.render('admin/user', {
        title: "User",
        layout: "layouts/layout",
        users: users,
        session: req.session
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan dalam memuat data pengguna");
    }
  },

  // Edit User
  editUser: async (req, res) => {
    const userId = req.params.id;
    const { name, username, level } = req.body;

    try {
      // Find the user and update the details
      await User.findByIdAndUpdate(userId, { name, username, level });

      res.redirect('/admin/user');
    } catch (err) {
      console.error(err);
      res.redirect('/admin/user');
    }
  },

  // Delete User
  deleteUser: async (req, res) => {
    const userId = req.params.id

    try {
      // // Delete all donations with matching user ID
      // await Donation.deleteMany({ user: userId });
      // Delete all donations with matching user ID
      await Donation.deleteMany({ user: req.params.id });
      // await Donation.where('user', userId).remove();

      // Find all donations with matching user ID
    // const donations = await Donation.find({ user: { $in: [userId] } });

    // Delete all donations
    // donation > 1 ? 
    // await Donation.deleteMany({ _id: { $in: donations.map(donation => donation._id) } }) :
    // await Donation.deleteOne({ _id: { $in: donations.map(donation => donation._id) } });


    // Find and delete the user
    await User.findByIdAndDelete(userId);

      res.redirect('/admin/user');
    } catch (err) {
      console.error(err);
      res.redirect('/admin/user');
    }
  },
}
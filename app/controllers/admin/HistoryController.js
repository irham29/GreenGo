const Donation = require('../../models/donation');
const User = require('../../models/user');

module.exports = {
  index: async (req, res) => {
    try {
      const donations = await Donation.find({ status: { $in: ['Selesai', 'Berlansung'] } }).populate('user', 'username');
      res.render('admin/history', {
        title: "History",
        layout: "layouts/layout",
        donations,
        session: req.session
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
}
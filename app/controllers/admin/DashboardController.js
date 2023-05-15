const Donation = require('../../models/donation');

module.exports = {
  index: async (req, res) => {
    try {
      const donations = await Donation.find({status: "Berlansung"});
      res.render('admin/dashboard', {
        title: "Admin",
        layout: "layouts/layout",
        donations,
        session: req.session
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Terjadi kesalahan dalam memuat data donasi");
    }
  },
}
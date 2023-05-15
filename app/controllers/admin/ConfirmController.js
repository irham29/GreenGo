const Donation = require('../../models/donation');

module.exports = {
  index: async (req, res) => {
    try {
      const donations = await Donation.find({is_accept: "Pending"});
      res.render('admin/confirm', {
        title: "Konfirmasi",
        layout: "layouts/layout",
        donations: donations,
        session: req.session
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Terjadi kesalahan dalam memuat data donasi");
    }
  },

  // Fungsi untuk menerima donasi
  acceptDonation: async (req, res) => {
    try {
      const donationId = req.params.id;
      const donation = await Donation.findById(donationId);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }

      donation.is_accept = "Accepted"
      donation.status = "Berlansung"
      await donation.save();

      res.redirect('/admin/confirm');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Fungsi untuk menolak donasi
  rejectDonation: async (req, res) => {
    try {
      const donationId = req.params.id;
      const donation = await Donation.nnodefindById(donationId);
      if (!donation) {
        return res.status(404).json({ message: 'Donation not found' });
      }

      donation.is_accept = 'Rejected';
      await donation.save();

      res.redirect('/admin/confirm');
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

}
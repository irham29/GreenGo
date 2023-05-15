const fs = require('fs');
const multer = require('multer');
const path = require('path');
const Donation = require("../../models/donation");

// Konfigurasi multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/donations'); // Tentukan folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    const fileExtension = path.extname(file.originalname);
    const fileName = `${file.fieldname}-${uniqueSuffix}${fileExtension}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

module.exports = {
  index: async (req, res) => {
    const userId = req.session.user._id;
    try {
      const donations = await Donation.find({user: userId});
      res.render('user/history', {
        title: "Riwayat Donasi",
        layout: "layouts/layout",
        donations,
        session: req.session,
      })
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },

  updateDonation: async (req, res) => {
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/history');
      }
      try {
        const donationId = req.params.id;
        const { name, description, condition, address } = req.body;
        const donation = await Donation.findById(donationId);
        const oldImage = donation.image;

        if (!donation) {
          return res.status(404).json({ message: 'Donasi tidak ditemukan' });
        }
        donation.name = name;
        donation.description = description;
        donation.condition = condition;
        donation.address = address;
        if(req.file){
          fs.unlinkSync(`public/images/donations/${oldImage}`);
          donation.image = req.file.filename;
        }
  
        await donation.save()

        res.redirect('/history');
      } catch (err) {
        console.log(err);
        res.redirect('/history');
      }
    });
  },
  
  deleteDonation: async (req, res) => {
    const donationId = req.params.id;
  
    try {
      // Mengambil donasi berdasarkan ID
      const donation = await Donation.findById(donationId);
  
      // Menghapus gambar dari sistem file
      fs.unlink(`public/images/donations/${donation.image}`, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Gambar berhasil dihapus');
        }
      });
  
      // Menghapus donasi dari database
      await Donation.findByIdAndDelete(donationId);
      console.log('Donasi berhasil dihapus');
  
      res.redirect('/history');
    } catch (err) {
      console.error(err);
      res.redirect('/history');
    }
  }
  
}
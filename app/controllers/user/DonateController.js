const multer = require('multer');
const path = require('path');
const Donation = require("../../models/donation")

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
  index: (req, res) => {
    res.render('user/donate', {
      title: "Donasi",
      layout: "layouts/layout",
      session: req.session
    })
  },

  storeDonation: (req, res) => {
    // Menangani proses upload gambar menggunakan multer
    upload.single('image')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/donate');
      }

      try {
        // Mengambil data dari body form
        const { name, description, condition, address, user } = req.body;

        // Membuat objek donasi baru
        const newDonation = new Donation({
          name,
          description,
          address,
          condition,
          user,
          image: req.file.filename, // Menyimpan nama file gambar dalam field 'image'
          status: "Pending",
          is_accept: "Pending",
          createdAt: new Date()
        });

        // Menyimpan donasi ke dalam database
        await newDonation.save();

        res.redirect('/dashboard');
      } catch (err) {
        console.log(err);
        res.redirect('/donate');
      }
    });
  },
}
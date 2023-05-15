// config/db.js

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/donation');

// // Fungsi untuk menghubungkan ke database MongoDB
// const connectDB = async () => {
//   try {
//     const url = 'mongodb://localhost:27017/donation';
//     await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Berhasil terhubung ke database MongoDB');
//   } catch (error) {
//     console.error('Koneksi MongoDB gagal:', error);
//     process.exit(1); // Keluar dari aplikasi jika terjadi kesalahan
//   }
// };

// module.exports = connectDB;

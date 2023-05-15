const User = require('../models/user');

module.exports = {
  login: async (req, res) => {
    try {
      res.render('login', {
        title: "Login",
        layout: false
      });
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal Server Error');
    }
  },

  loginProcess: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Cari pengguna berdasarkan username
      const user = await User.findOne({ username });

      // Periksa apakah pengguna ditemukan dan password cocok
      if (!user || user.password !== password) {
        return res.redirect('/login?error=Username atau password salah');
      }

      // Set session data
      req.session.user = user;
      // Login berhasil, redirect ke halaman sukses dengan data pengguna
      if (user.level == "Admin") {
        return res.redirect("/admin/dashboard");
      } else {
        return res.redirect("/dashboard");
      }
      // return res.redirect('/login-success');
    } catch (error) {
      console.error(error);
      return res.redirect('/login?error=Terjadi kesalahan pada server');
    }
  },

  logout: async (req, res) => {
    // Hapus data pengguna dari session
    req.session.user = null;

    // Redirect ke halaman login setelah logout
    res.redirect('/login');
  },

  registration: async (req, res) => {
    try {
      res.render('registration', {
        title: "Registrasi",
        layout: false
      });
    } catch (err) {
      console.error(err)
      res.status(500).send('Internal Server Error');
    }
  },

  registrationProcess: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      // Periksa apakah username atau email sudah digunakan sebelumnya
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        // return res.status(400).json({ message: 'Username atau email sudah digunakan' });
      res.status(500).send('Internal Server Error');
      }

      // Buat objek user baru
      const newUser = new User({
        username,
        email,
        password,
        level: "User",
      });

      // Simpan user ke dalam database
      await newUser.save();

      // res.status(201).json({ message: 'Registrasi berhasil' });
      res.redirect('/login')
    } catch (err) {
      console.error(err);
      // res.status(500).json({ message: 'Terjadi kesalahan saat mendaftar' });
      res.status(500).send('Internal Server Error');
    }
  },

  
}
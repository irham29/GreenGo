const checkUserLevel = (req, res, next) => {
  // Periksa level pengguna
  if (req.session.user && req.session.user.level == 'User') {
    // Level User, lanjutkan ke middleware berikutnya
    next();
  } else {
    // Bukan level User, kirim respons error
    // res.render('error', { layout: false, message: 'Akses ditolak' });
    res.redirect('/login');
  }
};

const checkAdminLevel = (req, res, next) => {
  // Periksa level pengguna
  if (req.session.user && req.session.user.level == 'Admin') {
    // Level Admin, lanjutkan ke middleware berikutnya
    next();
  } else {
    // Bukan level Admin, kirim respons error
    // res.render('error', { layout: false, message: 'Akses ditolak' });
    res.redirect('/login');
  }
};

module.exports = { checkUserLevel, checkAdminLevel };

const Message = require('../../models/message');
const moment = require('moment');

module.exports = {
  index: async(req, res) => {
    userId = req.session.user._id;
    const messages = await Message.find({recipient: userId})
    .populate('donation', '_id name image')
    .populate('sender', '_id username');
    try {
      res.render('user/message', {
        title: "Pesan",
        layout: "layouts/layout",
        session: req.session,
        messages,
        moment: moment,
      });   
    } catch (err) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  send: async (req, res) => {
    const { recipient, donation, content } = req.body;

    const senderId = req.session.user._id;
    try {
      // Buat objek pesan baru
      const newMessage = new Message({
        sender: senderId,
        recipient,
        donation,
        content,
        createdAt: new Date()
      });

      // Simpan pesan ke database
      await newMessage.save();

      return res.redirect('/message');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  },

  
}
const { register, login , username, getUserByUsername ,getUserById,resetPassword } = require('../services/authService');

const handleResetPassword = (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  resetPassword(userId, currentPassword, newPassword, (err, message) => {
    if (err) {
      return res.status(err.status).json({ error: err.message });
    }
    res.json({ msg: message });
  });
};


module.exports = {register,login, username, getUserByUsername,getUserById,handleResetPassword};
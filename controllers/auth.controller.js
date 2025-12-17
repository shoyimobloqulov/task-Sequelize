const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const SECRET_KEY = 'Sdqwq1234'; // Bu maxfiy kalitni xavfsiz joyda saqlang

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email allaqachon ishlatilgan' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    res.status(201).json({ message: 'Ro‘yxatdan o‘tildi', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.send('Email topilmadi');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.send('Parol xato');

  const token = jwt.sign(
    { id: user.id, role: user.role },
    SECRET_KEY,
    { expiresIn: '1d' }
  );

  // 🔥 COOKIEGA YOZAMIZ
  res.cookie('token', token, {
    httpOnly: true
  });

  res.redirect('/dashboard');
};


exports.dashboard = async (req, res) => {
  const userCount = await User.count({ where: { role: 'user' } });
  const adminCount = await User.count({ where: { role: 'admin' } });
  res.render('dashboard', { userCount, adminCount  });
};
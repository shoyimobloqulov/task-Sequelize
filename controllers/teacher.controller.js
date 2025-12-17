const { Teacher } = require('../models');

exports.list = async (req, res) => {
  const teachers = await Teacher.findAll();
  res.render('teacher', { teachers, role: req.user.role });
};

exports.create = async (req, res) => {
  const { name, subject } = req.body;
  await Teacher.create({ name, subject });
  res.redirect('/teachers');
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, subject } = req.body;
  await Teacher.update({ name, subject }, { where: { id } });
  res.redirect('/teachers');
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Teacher.destroy({ where: { id } });
  res.redirect('/teachers');
};

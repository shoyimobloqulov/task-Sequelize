const { Student, User, Group } = require('../models');
const bcrypt = require('bcrypt');

// CREATE
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: 'student'
  });

  const student = await Student.create({
    user_id: user.id
  });

  res.status(201).json({ user, student });
};

// READ ALL (Admin)
exports.findAll = async (req, res) => {
  const students = await Student.findAll({ include: User });
  res.json(students);
};

// READ ONE
exports.findOne = async (req, res) => {
  const student = await Student.findByPk(req.params.id, {
    include: [User, Group]
  });

  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
};

// UPDATE
exports.update = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  await student.update(req.body);
  res.json(student);
};

// DELETE
exports.remove = async (req, res) => {
  const student = await Student.findByPk(req.params.id);
  if (!student) return res.status(404).json({ message: 'Student not found' });

  await User.destroy({ where: { id: student.user_id } });
  await student.destroy();

  res.json({ message: 'Student deleted' });
};

exports.myGroups = async (req, res) => {
  const student = await Student.findOne({
    where: { user_id: req.user.id },
    include: Group
  });

  res.json(student.Groups);
};
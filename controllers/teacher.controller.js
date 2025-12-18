const { Teacher, User } = require('../models');
const bcrypt = require('bcrypt');

// CREATE
exports.create = async (req, res) => {
  const { name, email, password, lavozim, phone } = req.body;

  const user = await User.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
    role: 'teacher'
  });

  const teacher = await Teacher.create({
    user_id: user.id,
    lavozim,
    phone
  });

  res.status(201).json({ user, teacher });
};

// READ ALL
exports.findAll = async (req, res) => {
  const teachers = await Teacher.findAll({ include: User });
  res.json(teachers);
};

// READ ONE
exports.findOne = async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id, { include: User });
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
  res.json(teacher);
};

// UPDATE
exports.update = async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

  await teacher.update(req.body);
  res.json(teacher);
};

// DELETE
exports.remove = async (req, res) => {
  const teacher = await Teacher.findByPk(req.params.id);
  if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

  await User.destroy({ where: { id: teacher.user_id } });
  await teacher.destroy();

  res.json({ message: 'Teacher deleted' });
};

exports.addStudentToGroup = async (req, res) => {
  const { group_id, student_id } = req.body;

  const group = await Group.findOne({
    where: { id: group_id, teacher_id: req.user.id }
  });

  if (!group)
    return res.status(403).json({ message: 'Not your group' });

  await GroupStudent.create({ group_id, student_id });

  res.json({ message: 'Student added to group' });
};

exports.removeStudentFromGroup = async (req, res) => {
  const { group_id, student_id } = req.body;

  const group = await Group.findOne({
    where: { id: group_id, teacher_id: req.user.id }
  });

  if (!group)
    return res.status(403).json({ message: 'Not your group' });

  await GroupStudent.destroy({
    where: { group_id, student_id }
  });

  res.json({ message: 'Student removed from group' });
};
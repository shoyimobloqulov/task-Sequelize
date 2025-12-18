const { User, Teacher, Student, Group } = require('../models');
const bcrypt = require('bcrypt');

exports.createTeacher = async (req, res) => {
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

  res.json({ user, teacher });
};

exports.createStudent = async (req, res) => {
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

  res.json({ user, student });
};

exports.createGroup = async (req, res) => {
  const { group_name, teacher_id } = req.body;

  const group = await Group.create({
    group_name,
    teacher_id
  });

  res.json(group);
};

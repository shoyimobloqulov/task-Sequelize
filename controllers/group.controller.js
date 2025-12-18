const { Group, Teacher, Student } = require('../models');

// CREATE
exports.create = async (req, res) => {
  const { group_name, teacher_id } = req.body;

  const group = await Group.create({ group_name, teacher_id });
  res.status(201).json(group);
};

// READ ALL
exports.findAll = async (req, res) => {
  const groups = await Group.findAll({
    include: [Teacher, Student]
  });
  res.json(groups);
};

// READ ONE
exports.findOne = async (req, res) => {
  const group = await Group.findByPk(req.params.id, {
    include: [Teacher, Student]
  });

  if (!group) return res.status(404).json({ message: 'Group not found' });
  res.json(group);
};

// UPDATE
exports.update = async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) return res.status(404).json({ message: 'Group not found' });

  await group.update(req.body);
  res.json(group);
};

// DELETE
exports.remove = async (req, res) => {
  const group = await Group.findByPk(req.params.id);
  if (!group) return res.status(404).json({ message: 'Group not found' });

  await group.destroy();
  res.json({ message: 'Group deleted' });
};

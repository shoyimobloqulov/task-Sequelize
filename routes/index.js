const router = require('express').Router();
exports.router = router;
const teacher = require('../controllers/teacher.controller');
const student = require('../controllers/student.controller');
const group = require('../controllers/group.controller');
const { isAuth, isRole } = require('../middlewares/auth');

// TEACHER
router.post('/teachers', isAuth, isRole('admin'), teacher.create);
router.get('/teachers', isAuth, isRole('admin'), teacher.findAll);
router.get('/teachers/:id', isAuth, isRole('admin'), teacher.findOne);
router.put('/teachers/:id', isAuth, isRole('admin'), teacher.update);
router.delete('/teachers/:id', isAuth, isRole('admin'), teacher.remove)
router.post('/teacher/add', isAuth, isRole('teacher'), teacher.addStudentToGroup);
router.post('/teacher/remove', isAuth, isRole('teacher'), teacher.removeStudentFromGroup);

// STUDENT
router.post('/students', isAuth, isRole('admin'), student.create);
router.get('/students', isAuth, isRole('admin'), student.findAll);
router.get('/students/:id', isAuth, student.findOne);
router.put('/students/:id', isAuth, isRole('admin'), student.update);
router.delete('/students/:id', isAuth, isRole('admin'), student.remove);

// GROUP
router.post('/groups', isAuth, isRole('admin'), group.create);
router.get('/groups', isAuth, group.findAll);
router.get('/groups/:id', isAuth, group.findOne);
router.put('/groups/:id', isAuth, isRole('admin'), group.update);
router.delete('/groups/:id', isAuth, isRole('admin'), group.remove);
router.get('/student/groups', isAuth, isRole('student'), student.myGroups);

module.exports = router;

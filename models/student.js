module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {});

  Student.associate = models => {
    Student.belongsTo(models.User, { foreignKey: 'user_id' });

    Student.belongsToMany(models.Group, {
      through: models.GroupStudent,
      foreignKey: 'student_id'
    });
  };

  return Student;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'teacher', 'student'),
      allowNull: false
    }
  });

  User.associate = models => {
    User.hasOne(models.Teacher, { foreignKey: 'user_id' });
    User.hasOne(models.Student, { foreignKey: 'user_id' });
  };

  return User;
};

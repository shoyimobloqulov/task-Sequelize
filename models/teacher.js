module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    lavozim: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Teacher.associate = models => {
    Teacher.belongsTo(models.User, { foreignKey: 'user_id' });
    Teacher.hasMany(models.Group, { foreignKey: 'teacher_id' });
  };

  return Teacher;
};

module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    group_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Group.associate = models => {
    Group.belongsTo(models.Teacher, {
      foreignKey: 'teacher_id'
    });

    Group.belongsToMany(models.Student, {
      through: models.GroupStudent,
      foreignKey: 'group_id'
    });
  };

  return Group;
};

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    guruhId: DataTypes.INTEGER
  });
  return Student;
};

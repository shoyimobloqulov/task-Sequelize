module.exports = (sequelize, DataTypes) => {
  const Guruh = sequelize.define('Guruh', {
    name: DataTypes.STRING,
    year: DataTypes.INTEGER
  });
  return Guruh;
};

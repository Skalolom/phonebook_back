module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        name: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        }
    });
};
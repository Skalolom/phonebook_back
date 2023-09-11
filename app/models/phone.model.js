module.exports = (sequelize, DataTypes) => {
    return sequelize.define("phone", {
        phone_number: {
            type: DataTypes.STRING
        },
        phone_type: {
            type: DataTypes.STRING
        }
    });
};
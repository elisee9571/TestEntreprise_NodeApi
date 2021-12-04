module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "User", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.DataTypes.STRING(150),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false,
            },
            race: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true,
            },
            age: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true,
            },
            famille: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true,
            },
            nourriture: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: true,
            },
        }, {
            timestamps: true,
            underscored: true,
        }
    );
};
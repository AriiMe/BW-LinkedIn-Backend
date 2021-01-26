module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
        "like",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            elementId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }

        },
        { timestamps: true }
    );
    Like.associate = (models) => {
        Like.belongsTo(models.Post, { foreignKey: "elementId" })
        Like.belongsTo(models.Comment, { foreignKey: "elemntId" })
        Like.belongsTo(models.Profile)
    };
    return Like;
};
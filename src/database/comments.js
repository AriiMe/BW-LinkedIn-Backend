module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        "comment",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            text: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            imgurl: {
                type: DataTypes.STRING(500),
                allowNull: true,
            },
        },
        { timestamps: true }
    );
    Comment.associate = (models) => {
        Comment.belongsTo(models.Post)
        Comment.belongsTo(models.Profile); //ONE-TO-MANY: REVIEW IS MANY, ARTICLE IS ONE
    };
    return Comment;
};
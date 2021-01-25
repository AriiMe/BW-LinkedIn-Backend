module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define(
        "post",
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
                allowNull: false,
            },
        },
        { timestamps: true }
    );
    Posts.associate = (models) => {
        Posts.belongsTo(models.Profile); //ONE-TO-MANY: REVIEW IS MANY, ARTICLE IS ONE
    };
    return Posts;
};
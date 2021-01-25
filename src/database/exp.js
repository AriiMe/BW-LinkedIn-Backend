module.exports = (sequelize, DataTypes) => {
    const EXPIER = sequelize.define(
        "category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startdate: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            enddate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            area: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            company: {
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
    EXPIER.associate = (models) => {
        EXPIER.hasMany(models.Profile); //category belongs to a single product
    };
    return EXPIER;
};
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

class SurfSpot extends Model {
  declare id: number;
  userId!: number;
  city!: string;
  spotName!: string;
  timesSurfed!: number;
}

SurfSpot.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spotName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timesSurfed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "SurfSpot",
  }
);

User.hasMany(SurfSpot, { foreignKey: "userId" });
SurfSpot.belongsTo(User, { foreignKey: "userId" });

export default SurfSpot;

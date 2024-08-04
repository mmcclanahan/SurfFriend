import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

class Session extends Model {
  declare id: number;
  userId!: number;
  city!: string;
  spotName!: string;
  rating!: number;
  conditions?: string;
}

Session.init(
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
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diary: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    conditions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Session",
  }
);

User.hasMany(Session, { foreignKey: "userId" });
Session.belongsTo(User, { foreignKey: "userId" });

export default Session;

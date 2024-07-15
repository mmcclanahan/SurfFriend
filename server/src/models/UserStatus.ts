import { DataTypes } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

const UserStatus = sequelize.define("UserStatus", {
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  spotName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
});

UserStatus.belongsTo(User, { foreignKey: "userId" });
User.hasOne(UserStatus, { foreignKey: "userId", as: "status" });

export default UserStatus;

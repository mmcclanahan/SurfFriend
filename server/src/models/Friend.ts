import { DataTypes } from "sequelize";
import sequelize from "../database/db";

const UserStatus = sequelize.define("Friend", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
});

export default UserStatus;

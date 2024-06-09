import { DataTypes } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

const Friend = sequelize.define("Friend", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: "CASCADE",
    references: {
      model: "Users",
      key: "id",
    },
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
User.hasMany(Friend, { foreignKey: "userId", as: "Friends" });
User.hasMany(Friend, { foreignKey: "friendId", as: "FriendOf" });
Friend.belongsTo(User, { foreignKey: "userId" });
Friend.belongsTo(User, { foreignKey: "friendId" });

export default Friend;

import { DataTypes } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

const Friend = sequelize.define("Friend", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  accepted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

User.belongsToMany(User, {
  as: "FriendOf",
  through: Friend,
  foreignKey: "friendId",
  otherKey: "userId",
});
Friend.belongsTo(User, { foreignKey: "friendId", as: "friends" });
export default Friend;

import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

class Friend extends Model {
  declare id: number;
  userId!: number;
  friendId!: number;
  request!: string;
  createdAt?: Date;
  updatedAt?: Date;
  info?: {
    username: string;
    status?: {
      status: number;
      location?: string | null;
      rating?: number | null;
    };
  };
}
Friend.init(
  {
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
    request: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Friend",
  }
);

User.belongsToMany(User, {
  as: "FriendOf",
  through: Friend,
  foreignKey: "friendId",
  otherKey: "userId",
});
Friend.belongsTo(User, { foreignKey: "friendId", as: "info" });
export default Friend;

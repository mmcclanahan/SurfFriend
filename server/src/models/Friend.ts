import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

interface FriendAttributes {
  id: number;
  userId: number;
  friendId: number;
  accepted: boolean;
}

interface FriendCreationAttributes extends Optional<FriendAttributes, "id"> {}

class Friend
  extends Model<FriendAttributes, FriendCreationAttributes>
  implements FriendAttributes
{
  public id!: number;
  public userId!: number;
  public friendId!: number;
  public accepted!: boolean;
}

Friend.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    friendId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "friends",
    sequelize,
  }
);

Friend.belongsTo(User, { as: "User", foreignKey: "userId" });
Friend.belongsTo(User, { as: "Friend", foreignKey: "friendId" });

export default Friend;

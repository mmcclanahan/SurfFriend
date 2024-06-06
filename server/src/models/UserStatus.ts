// models/UserStatus.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";
import User from "./User";

interface UserStatusAttributes {
  id: number;
  status: number;
  location?: string;
  rating?: number;
  updatedAt: Date;
  userId: number;
}

interface UserStatusCreationAttributes
  extends Optional<UserStatusAttributes, "id"> {}

class UserStatus
  extends Model<UserStatusAttributes, UserStatusCreationAttributes>
  implements UserStatusAttributes
{
  public id!: number;
  public status!: number;
  public location?: string;
  public rating?: number;
  public updatedAt!: Date;
  public userId!: number;
}

UserStatus.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "userStatus",
    sequelize,
  }
);

UserStatus.belongsTo(User, { foreignKey: "userId" });

export default UserStatus;

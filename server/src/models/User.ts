import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

class User extends Model {
  declare id: number;
  username!: string;
  password!: string;
  email!: string;
  salt?: string;
  sessiontoke?: string;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sessiontoken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;

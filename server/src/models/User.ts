// models/User.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database/db";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  salt: string;
  sessiontoken?: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "sessiontoken"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public salt!: string;
  public sessiontoken?: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    sessiontoken: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export default User;

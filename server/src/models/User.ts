// models/User.ts
import { DataTypes } from "sequelize";
import sequelize from "../database/db";

const User = sequelize.define("User", {
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
});

export default User;

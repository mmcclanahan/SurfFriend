import { DataTypes } from "sequelize";
import sequelize from "../database/db";

const UserStatus = sequelize.define("UserStatus", {
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default UserStatus;

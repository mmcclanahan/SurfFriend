import sequelize from "../database/db";
import Friend from "../models/Friend";
import User from "../models/User";
import UserStatus from "../models/UserStatus";

const userObj = {
  username: "b",
  email: "b@gmail.com",
  password: "password",
};

const userObj2 = {
  username: "c",
  email: "c@gmail.com",
  password: "password",
};

const userObj3 = {
  username: "d",
  email: "d@gmail.com",
  password: "password",
};
const users = [userObj, userObj2, userObj3];

const friendObj = {
  userId: 1,
  friendId: 2,
};
const fill = async (
  users: { username: string; email: string; password: string }[],
  friendObj: { userId: number; friendId: number }
) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    await User.bulkCreate(users);
    await Friend.create(friendObj);
    console.log("filled");
  } catch (error) {
    console.log(error);
  }
};

fill(users, friendObj);

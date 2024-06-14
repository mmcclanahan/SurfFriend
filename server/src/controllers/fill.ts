import { request } from "express";
import sequelize from "../database/db";
import Friend from "../models/Friend";
import User from "../models/User";
import UserStatus from "../models/UserStatus";

const userObj = {
  username: "user1",
  email: "user1@gmail.com",
  password: "password",
};

const userObj2 = {
  username: "user2",
  email: "user2@gmail.com",
  password: "password",
};

const userObj3 = {
  username: "user3",
  email: "user3@gmail.com",
  password: "password",
};
const userObj4 = {
  username: "user4",
  email: "user4@gmail.com",
  password: "password",
};
const users = [userObj, userObj2, userObj3, userObj4];

const friendObjs = [
  {
    userId: 1,
    friendId: 2,
    request: "accepted",
  },
  {
    userId: 1,
    friendId: 3,
    request: "sent",
  },
  {
    userId: 1,
    friendId: 4,
    request: "received",
  },
];

const statusObjs = [
  {
    userId: 2,
    status: 2,
    location: "12th St",
    rating: null,
  },
  {
    userId: 3,
    status: 3,
    location: "33rd St",
    rating: null,
  },
  {
    userId: 4,
    status: 4,
    location: "34th St",
    rating: 3,
  },
];
const fill = async (
  users: { username: string; email: string; password: string }[],
  friendObjs: { userId: number; friendId: number }[],
  statusObjs: {
    userId: number;
    status: number;
    location?: string;
    rating?: number | null;
  }[]
) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    await User.bulkCreate(users);
    console.log("users filled");
    await Friend.bulkCreate(friendObjs);
    console.log("friends filled");
    await UserStatus.bulkCreate(statusObjs);
    console.log("status filled");
  } catch (error) {
    console.log(error);
  }
};

fill(users, friendObjs, statusObjs);

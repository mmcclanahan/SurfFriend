import sequelize from "../database/db";
import Friend from "../models/Friend";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import Session from "../models/Session";
import SurfSpot from "../models/SurfSpot";

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
    userId: 2,
    friendId: 1,
    request: "accepted",
  },
  {
    userId: 1,
    friendId: 3,
    request: "sent",
  },
  {
    userId: 3,
    friendId: 1,
    request: "received",
  },
  {
    userId: 1,
    friendId: 4,
    request: "received",
  },
  {
    userId: 4,
    friendId: 1,
    request: "sent",
  },
];

const statusObjs = [
  {
    userId: 1,
    status: 1,
    city: "",
    spotName: "",
    rating: 0,
  },
  {
    userId: 2,
    status: 2,
    city: "Huntington Beach",
    spotName: "12th St",
    rating: 0,
  },
  {
    userId: 3,
    status: 3,
    city: "Huntington Beach",
    spotName: "33rd St",
    rating: 0,
  },
  {
    userId: 4,
    status: 4,
    city: "Newport Beach",
    spotName: "34th St",
    rating: 3,
  },
];

const spots = [
  {
    userId: 2,
    city: "Newport Beach",
    spotName: "The Wedge",
    timesSurfed: 10,
  },
  {
    userId: 2,
    city: "Huntington Beach",
    spotName: "HB Pier",
    timesSurfed: 5,
  },
  {
    userId: 3,
    city: "Huntington Beach",
    spotName: "Goldenwest",
    timesSurfed: 3,
  },
];

const fill = async (
  users: { username: string; email: string; password: string }[],
  friendObjs: { userId: number; friendId: number }[],
  statusObjs: {
    userId: number;
    status: number;
    city?: string;
    spotName?: string;
    rating?: number;
  }[],
  spots: {
    userId: number;
    city: string;
    spotName: string;
    timesSurfed: number;
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
    await Session.create({
      userId: 1,
      city: "Huntington Beach",
      spotName: "North Side",
      rating: 3,
    });
    console.log("session filled");
    //await SurfSpot.bulkCreate(spots);
    //console.log("spots filled");
  } catch (error) {
    console.log(error);
  }
};

fill(users, friendObjs, statusObjs, spots);

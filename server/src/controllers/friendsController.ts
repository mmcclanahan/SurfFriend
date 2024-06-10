import { Request, Response } from "express";
import User from "../models/User";
import UserStatus from "../models/UserStatus";
import Friend from "../models/Friend";

export const getFriends = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const friends = await Friend.findAll({
      //accepted: true
      where: { userId },
      include: [
        {
          model: User,
          as: "friends",
          attributes: ["username"],
          include: [
            {
              model: UserStatus,
              as: "status",
              attributes: ["status", "location", "rating"],
            },
          ],
        },
      ],
    });
    res.status(200).send(friends);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user's friends");
  }
};

export const createFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendUserName } = req.body;
  try {
    const friendObj = await User.findOne({
      where: { username: friendUserName },
    });
    if (!friendObj) {
      res.status(404).send("User not found");
      return;
    }
    await Friend.create({
      userId,
      friendId: friendObj.id,
    });

    await Friend.create({
      userId: friendObj.id,
      friendId: userId,
    });

    res.status(200).send("friend request sent");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

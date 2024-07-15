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
          as: "info",
          attributes: ["username"],
          include: [
            {
              model: UserStatus,
              as: "status",
              attributes: ["status", "city", "spotName", "rating"],
            },
          ],
        },
      ],
    });
    const flattenedFriends = friends.map((friend) => {
      if (friend.request === "accepted") {
        return {
          userId: friend.userId,
          friendId: friend.friendId,
          request: friend.request,
          createdAt: friend.createdAt,
          updatedAt: friend.updatedAt,
          username: friend.info?.username,
          status: friend.info?.status?.status,
          city: friend.info?.status?.city,
          spotName: friend.info?.status?.spotName,
          rating: friend.info?.status?.rating,
        };
      } else {
        return {
          userId: friend.userId,
          friendId: friend.friendId,
          request: friend.request,
          createdAt: friend.createdAt,
          updatedAt: friend.updatedAt,
          username: friend.info?.username,
        };
      }
    });
    res.status(200).send(flattenedFriends);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  try {
    await Friend.destroy({
      where: { userId, friendId },
    });
    await Friend.destroy({
      where: { userId: friendId, friendId: userId },
    });
    res.status(200).send("Friend deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting friend");
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
      request: "sent",
    });

    await Friend.create({
      userId: friendObj.id,
      friendId: userId,
      request: "received",
    });

    res.status(200).send("friend request sent");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

export const comfirmFriendRequest = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;
  try {
    await Friend.update(
      { request: "accepted" },
      { where: { userId, friendId } }
    );
    await Friend.update(
      { request: "accepted" },
      { where: { userId: friendId, friendId: userId } }
    );
    res.status(200).send("Friend request accepted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error accepting friend request");
  }
};

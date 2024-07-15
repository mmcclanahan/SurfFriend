import { Request, Response } from "express";
import sequelize from "../database/db";
import User from "../models/User";
import UserStatus from "../models/UserStatus";

export const createUser = async (req: Request, res: Response) => {
  const t = await sequelize.transaction();
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create(
      {
        username,
        email,
        password,
      },
      { transaction: t }
    );
    const newStatus = await UserStatus.create(
      {
        userId: newUser.id,
        status: 1,
        city: "Create",
        spotName: "a surf spot first",
        rating: 0,
      },
      { transaction: t }
    );
    await t.commit();
    res.status(200).send(newUser);
  } catch (error) {
    await t.rollback();
    res.send(error);
  }
};
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
/*
export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, salt, sessiontoken } = req.body;
    const user = await User.create({
      username,
      email,
      password,
      salt,
      sessiontoken,
    });
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send({ error: "Failed to create user" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, email, password, salt, sessiontoken } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username ?? user.username;
      user.email = email ?? user.email;
      user.password = password ?? user.password;
      user.salt = salt ?? user.salt;
      user.sessiontoken = sessiontoken ?? user.sessiontoken;

      await user.save();
      res.send(user);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update user" });
  }
};
*/

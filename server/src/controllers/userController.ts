import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
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

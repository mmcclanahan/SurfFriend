import { Request, Response } from "express";
import { supabase } from "../models/db";

export const setStatus = async (req: Request, res: Response) => {
  const { value } = req.body;
  const { error } = await supabase.from("test").insert({ value }).single();
  if (error) {
    return res.status(400).send(error);
  } else {
    return res.status(200).send("success");
  }
};

export const getStatus = async (req: Request, res: Response) => {
  const { data, error } = await supabase.from("test").select("value");
  if (error) {
    return res.status(400).send(error);
  } else {
    return res.status(200).send(data);
  }
};

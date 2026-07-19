import { Users } from "../models/userModel.js";
import { Router } from "express";

//create object router
const userRoute = Router();

userRoute.get("/home", async function (req, res) {
  res.status(200).json({ msg: "home page" });
});

//route to get users, route handler
userRoute.get("/", async function (req, res) {
  res.status(200).json({ Users });
});

//route to post users, route handler
userRoute.post("/", (req, res) => {
  Users.push(req.body);
  res.status(201).json(req.body);
});

userRoute.patch("/:id", async (req, res) => {
  const newUser = Users.find((user) => user.id === Number(req.params.id));

  if (!newUser) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }
  Object.assign(newUser, req.body);

  res.status(200).json(newUser);
});

userRoute.put("/:id", (req, res) => {
  const index = Users.findIndex((user) => user.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  Users[index] = {
    id: Number(req.params.id),
    ...req.body,
  };

  res.status(200).json(Users[index]);
});

userRoute.delete("/:id", (req, res) => {
  const index = Users.findIndex((user) => user.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const deletedUser = Users.splice(index, 1);

  res.status(200).json({
    message: "User deleted successfully",
    deletedUser: deletedUser[0],
  });
});

export default userRoute;

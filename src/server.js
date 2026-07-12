import express from "express";
import { Users } from "./models/user.js";

//create an object express
const app = express();

app.use(express.json());

//first route/ route handler
app.get("/home", async function (req, res) {
  res.status(200).json({ msg: "home page" });
});

//route to get users, route handler
app.get("/users", async function (req, res) {
  res.status(200).json({ Users });
});

//route to post users, route handler
app.post("/users", (req, res) => {
  Users.push(req.body);
  res.status(201).json(req.body);
});

app.patch("/users/:id", async (req, res) => {
  const newUser = Users.find((user) => user.id === req.params.id);

  if (!newUser) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }
  Object.assign(newUser, req.body);

  res.status(200).json(newUser);
});

app.put("/users/:id", (req, res) => {
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

app.delete("/users/:id", (req, res) => {
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

app.listen(5000, () => console.log("server started"));

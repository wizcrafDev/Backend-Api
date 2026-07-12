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
  res.status(201).res.json(req.body);
});

app.patch("/users", async (req, res) => {
  try {
    const newUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.put("/users", async (req, res) => {
  try {
    const newUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(5000, () => console.log("server started"));

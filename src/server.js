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

app.post("/users", (req, res) => {
  Users.push(res.body);
  res.status(201).res.json(req.body);
});

//route to post users, route handler

app.listen(5000, () => console.log("server started"));

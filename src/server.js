import express from "express";
import userRoute from "./routes/userRoutes.js";

//create an object express
const app = express();

app.use(express.json());
//use routes
app.use("/users", userRoute);

app.listen(5000, () => console.log("server started"));

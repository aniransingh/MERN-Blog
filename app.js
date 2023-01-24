require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./src/auth/router")

const app = express();

app.use(cors());
app.use(express.json());

// DB Connection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://aniran:1234@nodeexpressprojects.wvsdwww.mongodb.net/?retryWrites=true&w=majority");
mongoose.connection.on("connected", () => {
    console.log("DB CONNECTED");
})

app.use("/auth", authRouter);

app.listen(4000, () => {
    console.log("server listening on port 4000");
});

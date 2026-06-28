// creating a basic web server using express
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./configs/db");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const connectionRequestRouter = require("./routes/connectionRequest");

const app = express();
app.use(cookieParser());


const PORT = 3000;
const saltRounds = 12;


// Middleware to parse JSON bodies
app.use(express.json());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/connectionRequest", connectionRequestRouter);

// starting the server
connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(
      "Failed to start server due to database connection error",
      error,
    );
    process.exit(1);
  });

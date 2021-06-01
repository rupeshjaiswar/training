require("dotenv").config(); // importing the dotenv file
const express = require("express"); //importing express application
const app = express(); //initialising express application

const userRouter = require("./api/users/user.router");

//converting the json objects into javascript objects
app.use(express.json());

//listening the server
// app.get("/api", (req, res) => {
//     res.json({
//         success: true,
//         message: "This is working REST APIs"
//     });
// });

//adding users using post request
app.use("/api/users", userRouter);

//defining a port for listening 
app.listen(process.env.APP_PORT, () => {
    console.log("Server up and Running on PORT :", process.env.APP_PORT);
});
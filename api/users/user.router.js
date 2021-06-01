const {
    createUser,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    login
} = require("./user.controller"); // importing all the controllers from user.controller.js
const router = require("express").Router();
const { checkToken } = require("../../authentication/token-validation"); //importing the checktoken from user.controller


// definining routes using the Router
router.post("/", checkToken, createUser); // route to create a user in the database
router.get("/", checkToken, getUsers); // route to get all the users in the database 
router.get("/:id", checkToken, getUserByUserId); // route tp get a user by it's id from the database
router.patch("/", checkToken, updateUser); // route to update a user in the database
router.delete("/", checkToken, deleteUser); // route to delete a user in the database
router.post("/login", login); // route for login to access the other routes

module.exports = router;
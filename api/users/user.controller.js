const {
    create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    getUserByUserEmail
} = require("./user.service"); // importing all the services created in user.service

const { genSaltSync, hashSync, compareSync } = require("bcrypt"); // importing bcrypt package for the encryption of the password
const { sign } = require("jsonwebtoken"); //sign method to create JSON web tokens

module.exports = {

    //controller to create a user in the database
    createUser: (req, res) => {
        const body = req.body // whatever the users password will be saved inside this body
            // generting the hash encrypted password 
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Database Connection error"
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        });

    },

    //controller to get all the users from the database
    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Failed to get the users"
                });
            }
            if (!results) {
                return res.status(500).json({
                    success: true,
                    message: "Record Empty"
                });
            }
            return res.status(500).json({
                success: true,
                data: results
            });
        });
    },

    //controller to get user by id form the database
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Cannot update the user by id"
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: true,
                    message: "Record not found"
                });
            }
            return res.status(200).json({
                success: true,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return false;
            }
            if (!results) {
                return res.status(200).json({
                    succes: false,
                    message: "Failed to update the user"
                });
            }
            return res.status(500).json({
                succes: true,
                message: "Updated sucessfully"
            });

        });
    },

    //controller for deleting a data from the database
    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Cannot delete the user"
                });
            }
            if (!results) {
                return res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                });
            }
            return res.status(500).json({
                success: true,
                message: "Record not found"
            });
        });
    },

    //controller for login
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.status(500).json({
                    success: false,
                    data: "Invalid email or password"
                });

            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIME });
                return res.status(200).json({
                    success: true,
                    message: "Logged in successfully",
                    token: jsontoken
                });

            } else {
                return res.status(500).json({
                    success: false,
                    data: "Invalid email or password"
                });
            }
        });
    }
}
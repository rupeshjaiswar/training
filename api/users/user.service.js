const pool = require("../../config/database"); // importing the pool database here

// exporting the service as modules to be used in other files
module.exports = {
    //service for creating a user in the database
    create: (data, callBack) => {
        pool.query(
            `insert into registration(firstname, lastname, gender, email, password, number)
                        values(?, ?, ?, ?, ?, ?)`, [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //service for geting all the users in the database
    getUsers: callBack => {
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration`, [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //service for getting a user from it's id from the database
    getUserByUserId: (id, callBack) => {
        pool.query(
            `select id,firstname,lastname,gender,email,number from registration where id = ?`, [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    //service for update a user in the database
    updateUser: (data, callBack) => {
        pool.query(
            `update registration set firstname = ?, lastname = ?, gender = ?, email = ?, number = ? where id = ?`, [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.number,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(data, results[0]);
            }
        );
    },

    //service for deleting a user from the database
    deleteUser: (data, callBack) => {
        pool.query(
            `delete from registration where id = ?`, [data.id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    //service for login
    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from registration where email = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    }

};
const { verify } = require("jsonwebtoken"); //importing verify method in jsonwebtoken package

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7); //slicing the bearer from the token
            verify(token, process.env.JWT_KEY, (err, decode) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: "Invalid Token"
                    });
                } else {
                    next(); //if no error just call the next method
                }
            });
        } else {
            res.json({
                success: false,
                message: "Access denied! unauthorized user"
            });
        }
    }
}
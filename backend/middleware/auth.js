const jwt = require("jsonwebtoken");

module.exports.auth = (req, res, next) => {
    try{
        const token = req.cookies.token;

        //Check for token availability
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Login required!",
            });
        }

        //If token exists
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decode;

        next();
    } catch(err){
        console.log(err);
        console.log("Login middleware error");

        return res.status(401).json({
            success: false,
            message: "Invalid token!",
        });
        
    }
}
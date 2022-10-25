const jwt = require('jsonwebtoken');
const config = require('../config/config.json');
const User = require("../models/user");

module.exports = isAuth = async(req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json("토큰 오류");
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.security.JWT_SECRET,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json("토큰 오류");
            }
            const user = await User.findOne({
                attributes: ['userId','nickname','partNumber'],
                where: { userId: decoded.userId},
            });
            if (user == null) {
                return res.status(401).json("토큰 오류");
            }
            req.userId = user.userId;
            req.nickname = user.nickname;
            req.partNumber = user.partNumber;
            next();
        }
    );
};
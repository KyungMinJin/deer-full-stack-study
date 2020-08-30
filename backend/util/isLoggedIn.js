const jwt = require("jsonwebtoken");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;
  // const token = req.cookie.token;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const userId = payload.id;
    req.userId = userId;
    next();
  } catch (error) {
    return res.json({ status: 401, msg: "권한 없음" });
  }
};

module.exports = isLoggedIn;

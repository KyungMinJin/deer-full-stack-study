const express = require("express");
const router = express.Router();

const pool = require("../util/mysql");
const crypto = require("crypto");
const isLoggedIn = require("../util/isLoggedIn");
require("dotenv").config();

/* GET users listing. */
router.get("/", (req, res, next) => {
  // 옛날 콜백 함수 - callback hell
  // connection.query(`SELECT * FROM user_TB`, (err, results) => {
  //   const firstuser = results[0];
  //   const userId = firstuser.id;
  //   connection.query(
  //     "SELECT * FROM report_TB WHERE user_id = ?",
  //     [userId],
  //     (err, result) => {
  //       res.json({ status: 200, arr: result });
  //     }
  //   );
  // });
  res.send("You entered users page.");
});

// callback => promise
router.get("/hoho", (req, res, next) => {
  // connection.query(`SELECT * FROM user_TB`).then((results) => {
  //   const firstuser = results[0];
  //   const userId = firstuser.id;
  //   return res.json(results[0]);
  // });
  res.send("You entered users hoho page.");
});

router.get("/hohoho", async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    // 뒤에 메타 데이터 따라옴
    // const results = await connection.query(`SELECT * FROM user_TB`);
    // 처음 원하는 데이터만 받기
    const [results] = await connection.query(`SELECT * FROM user_TB`);
    //pool로 커넥션 돌려줌
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, msg: "서버에러!" });
  }
});

router.post("/", async (req, res, next) => {
  const { email, pwd } = req.body;
  const salt = (await crypto.randomBytes(64)).toString("base64");
  const hashedPwd = crypto
    .pbkdf2Sync(pwd, salt, 100000, 64, "SHA512")
    .toString("base64");
  try {
    const connection = await pool.getConnection();
    await connection.query(
      `INSERT INTO user_TB(email, hashed_pwd, pwd_salt) VALUES(?, ?, ?)`,
      [email, hashedPwd, salt]
    );
    connection.release();
    res.json({ status: 201, msg: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, msg: "서버에러!" });
  }
});

router.post("/login", async (req, res, next) => {
  const { email, pwd } = req.body;

  try {
    const connection = await pool.getConnection();
    const [
      users,
    ] = await connection.query(`SELECT * FROM user_TB WHERE email = ?`, [
      email,
    ]);
    connection.release();
    // 이메일 없는 경우
    if (users.length === 0) {
      return res.json({ status: 401, msg: "없는 이메일입니다." });
    }

    const user = users[0];
    const hashedPwd = crypto
      .pbkdf2Sync(pwd, user.pwd_salt, 100000, 64, "SHA512")
      .toString("base64");

    if (hashedPwd !== user.hashed_pwd) {
      return res.json({ status: 401, msg: "비밀번호가 다릅니다." });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true, secure: true });
    // 'http://afdlkj.com/hello?token=' + document.cookie.token; 로 해킹
    res.json({ status: 201, token: token });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, msg: "서버에러!" });
  }
});

// 미들웨어 isLoggedIn
router.get("/me/profile", isLoggedIn, async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [results] = await connection.query(
      `SELECT * FROM user_TB WHERE id = ?`,
      req.userId
    );
    connection.release();
    res.json({ status: 200, arr: results });
  } catch (error) {
    console.log(error);
    res.json({ status: 500, msg: error });
  }
});

module.exports = router;

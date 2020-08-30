var express = require("express");
var router = express.Router();

const pool = require("../util/mysql");

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
  const connection = await pool.getConnection();
  // 뒤에 메타 데이터 따라옴
  // const results = await connection.query(`SELECT * FROM user_TB`);
  // 처음 원하는 데이터만 받기
  const [results] = await connection.query(`SELECT * FROM user_TB`);
  //pool로 커넥션 돌려줌
  connection.release();
  res.json({ status: 200, arr: results });
});

router.get("/ahahahah", (req, res, next) => {
  res.json({ status: 200, data: { msg: "ahahahah" } });
});

router.get("/bbbb", (req, res, next) => {
  res.json({ status: 200, data: { msg: "bbbb" } });
});

router.get("/master", (req, res, next) => {
  res.json({ status: 200, data: { msg: "master" } });
});

module.exports = router;

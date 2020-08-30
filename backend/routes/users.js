var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/hoho", function (req, res, next) {
  res.send("hohohoho");
});

router.get("/hohoho", function (req, res, next) {
  res.json({ status: 200, data: { msg: "hohohoho" } });
});

module.exports = router;

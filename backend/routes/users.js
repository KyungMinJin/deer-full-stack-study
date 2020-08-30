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

router.get("/ahahahah", function (req, res, next) {
  res.json({ status: 200, data: { msg: "ahahahah" } });
});

router.get("/bbbbb", function (req, res, next) {
  res.json({ status: 200, data: { msg: "bbbbb" } });
});

module.exports = router;

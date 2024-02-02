var express = require("express");
var router = express.Router();

/* index route*/
router.get("/", function (req, res, next) {
  res.redirect("/api/");
});

module.exports = router;

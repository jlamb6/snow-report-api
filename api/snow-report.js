const express = require("express");
const cors = require("cors");

const SnowReports = require('../models/snow-report');
const router = express.Router();

router.get("/:resort", cors(), (req, res) => {
  SnowReports.find({resort: req.params.resort}).sort('-date').exec((err, report) => {
    if (err) {
      res.json({message: "an error occurred while finding snow reports for" + req.params.resort});
      console.log(err);
    }
    else {
      res.json({data: report[0]});
    }
  });
});

module.exports = router;

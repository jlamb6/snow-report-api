const express = require("express");
const cors = require("cors");
const axios = require('axios');

const router = express.Router();

const resorts = {
  brighton: {
    lat: "40.5980",
    lon: "-111.5832"
  },
  alta: {
    lat: "",
    lon: ""
  }
}

router.get("/:resort", cors(), async function (req, res) {
  if (resorts[req.params.resort] == undefined) {
    res.json({err: `The resort, ${req.params.resort}, is not found in our system.`});
  }
  const resort = resorts[req.params.resort];
  const url = `https://api.darksky.net/forecast/${process.env.DARKY_SKY_API_KEY}/${resort.lat},${resort.lon}`;
  const response = await axios.get(url)
    .then(res => res.data)
    .catch(err => res.send(err));
  const returnData = {
    current: response.currently,
    today: response.daily.data.shift(),
    forecast: response.daily.data
  }
  res.send(returnData);
});

module.exports = router;
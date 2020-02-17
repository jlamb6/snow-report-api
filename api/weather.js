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
    lat: "40.5884",
    lon: "-111.6386"
  },
  snowbird: {
    lat: "40.5832837",
    lon: "-111.6507578"
  },
  solitude: {
    lat: "40.6199",
    lon: "-111.5919"
  },
  snowbasin: {
    lat: "41.2160",
    lon: "-111.8569"
  },
  parkCity: {
    lat: "40.6514",
    long: "-111.5080"
  },
  powderMountain: {
    lat: "41.3790",
    lon: "-111.7807"
  },
  brianHead: {
    lat: "37.7023",
    lon: "-112.8499"
  },
  cherryPeak: {
    lat: "41.9263",
    lon: "-111.7564"
  },
  beaverMountain: {
    lat: "41.9677",
    lon: "-111.5383"
  },
  deerValley: {
    lat: "40.6374",
    lon: "-111.4783"
  },
  eaglePoint: {
    lat: "38.3203",
    lon: "-112.3839"
  },
  sundance: {
    lat: "40.3934",
    lon: "-111.5888"
  },
  woodwardParkCity: {
    lat: "40.7545",
    lon: "-111.5856"
  },
  nordicValley: {
    lat: "41.3104",
    lon: "-111.8648"
  }
}

const cleanResortName = (name) => {
  if (!name.includes("-")) return name;
  
  const arr = name.split("-");
  const nameParts = arr.map((cur, index) => (index > 0) ? cur.charAt(0).toUpperCase() + cur.substring(1) : cur);

  return nameParts.join("");
}

router.get("/:resort", cors(), async function (req, res) {
  const resortName = cleanResortName(req.params.resort);
  const resort = resorts[resortName];
  if (resort == undefined) {
    res.json({err: `The resort, ${resort}, is not found in our system.`});
  }
  const url = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${resort.lat},${resort.lon}`;
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
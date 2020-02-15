require("dotenv").config();

const express         = require("express"),
      bodyParser      = require('body-parser'),
      methodOverride  = require('method-override'),
      mongoose        = require("mongoose");

const app = express();
const PORT = 5000;
const uri = process.env.MONGO_URI;
const snowReportApi = require('./api/snow-report');

mongoose.connect(uri, {useNewUrlParser: true, useFindAndModify: false });

app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/snow-report", snowReportApi);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
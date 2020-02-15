const mongoose = require("mongoose");

const SnowReportsSchema = new mongoose.Schema({
  'resort': String,
  '24hour': String,
  '48hour': String,
  'base': String,
  'ytd': String,
  'lifts': String,
  'runs': String,
  'parks': String,
  'date': String
});

const SnowReports = mongoose.model('snowReports', SnowReportsSchema, 'snowReports');

module.exports = SnowReports;
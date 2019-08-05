var express = require('express')
var morgan = require("morgan");
var app = express();
var utils = require("./lib/utils")

// var _data = "./data";
// var _datafile = "data.json";
// var fs = require("fs");

app.use(morgan('dev'));

app.get('/find', function (req, res) {
  var userSearchTerm = req.query.query, data;
  var searchTerm;
  console.log(req.query)
  if (!userSearchTerm || userSearchTerm.length < 3) {
    return res.status(200).json({ data })
  }
  try {
    response = utils.getData();

    searchTerm = response.data.results.searchTerm;
    var availableSearchTerm = searchTerm ? searchTerm["name"] : null;
    if (userSearchTerm && availableSearchTerm && typeof availableSearchTerm === "string") {
      if (availableSearchTerm.toLowerCase().includes(userSearchTerm.toLowerCase())) { data = response.data } else {

        console.log("search term not found");
      }
    }


  } catch (error) {
    throw new Error("Error in query : " + error.toString())
  }
  res.status(200).json({ data })
})

app.use((req, res, next) => {
  const error = new Error("route not found");
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  res.status(error.status || 500)
  res.json({ error: { message: error.message } });
});

app.listen(9000)
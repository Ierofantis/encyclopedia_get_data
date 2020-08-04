var express = require('express');
var router = express.Router();
const https = require('https');

router.get('/', function (req, res, next) {
  let data = "";
  function getBandsByGender(DisplayStart) {

    while (DisplayStart < 40000) {
      DisplayStart += 500;

      https.get('https://www.metal-archives.com/browse/ajax-genre/g/black/json/1?sEcho=1&iColumns=22&sColumns=&iDisplayStart=' + DisplayStart + '+iDisplayLength=1000&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=22&iSortCol_0=0&sSortDir_0=asc&iSortingCols=1&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=false&_=1594226003148', (resp) => {

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
          fs = require('fs')
          fs.writeFile('/Users/Kill/Desktop/bands', data, function (err, data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
          });
        });

      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });

      console.log("DisplayStart: ", DisplayStart)
    }
  }
  getBandsByGender(0)
});

router.get('/transformToJson', function (req, res, next) {
  let arr = [];
  var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'black_metal2.json');

  fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {

    var parse = JSON.parse(data);
    if (!err) {
      parse.aaData.forEach(function (item) {
        arr.push(Object.assign({}, item))
      });
      fs.writeFile('/Users/Kill/Desktop/bands2', JSON.stringify(arr), function (err, data) {
        if (err) {
          return console.log(err);
        }
        console.log(data);
      });
    } else {
      console.log(err);
    }
  });
});
module.exports = router;

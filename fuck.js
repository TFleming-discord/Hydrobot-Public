//import { write, read, appendFile, readFile, writeFile } from 'fs';
//import { leaderboard } from './leaderboards.js'
//import { fart } from './highlights.js'
//var fs = require('fs')

/*var filename = "leaderboards.js"
var datatoappend = "YoshiLamer:2"

var user = "YoshiLamer"
var score = 2
var Null = "Null:0"

readFile("leaderboards.js", {encoding: 'utf8'}, function (err,data) {
  var formatted = data.replace(/Null:0/g, 231907842922119178 + ":" + 1 + ",\n    Null:0");
  console.log("Adding new index")
  writeFile("leaderboards.js", formatted, 'utf8', function (err) {
   if (err) return console.log(err);
  });
});

import('./leaderboards.js')
  .then(leaderboard => {
  console.log(231907842922119178 in leaderboard)
  //import { leaderboard } from './leaderboards.js'
})

/*appendFile(filename, datatoappend, (err) => {
    if (err) throw err;
    console.log('The "' +  datatoappend + '" was appended to file!'); //write to file
  });*/

/*readFile("leaderboards.js", {encoding: 'utf8'}, function (err,data) {
    var formatted = data.replace(/Null:0/g, user + ":" + score.toLocaleString() + ",\n    Null:0");
    writeFile("leaderboards.js", formatted, 'utf8', function (err) {
        if (err) return console.log(err);
 });
});*/

var boobs = ["A"["small"],"B"["still small"],"C"["ok"],"D"["good size"],"E"["god please"]]

console.log(boobs[1][0])


console.log("Ran")
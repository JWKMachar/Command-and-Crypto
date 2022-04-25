const fs = require("fs");
const path = require("path");
let a = [8, 9, 10, 13, 18, 19, 20];
function getRandomElement() {
  return a[Math.floor(Math.random() * a.length)].toString();
}

const size = 128;

var data = "";
data += "2,";
for (var x = 2; x < size; x++) {
  data += "5";
  data += ",";
}
data += "6\n";

for (var y = 1; y < size - 1; y++) {
  data += "7,";
  for (var x = 1; x < size - 1; x++) {
    data += getRandomElement();
    data += ",";
  }
  data += "11"; 
  data += "\n";
}

data += "22,";
for (var x = 2; x < size; x++) {
  data += "23";
  data += ",";
}

data += "26";
fs.writeFile(path.join(__dirname, "/tilemap.csv"), data, console.log);

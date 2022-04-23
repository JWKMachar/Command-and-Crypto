const fs = require("fs");
const path = require("path")
let a = [8, 9, 10, 13, 18, 19, 20]
function getRandomElement() {
    return a[Math.floor(Math.random() * a.length)].toString();
}

const size = 64;

var data = '';

for (var y = 0; y < size; y++)
{
    for (var x = 0; x < size; x++)
    {
        data += getRandomElement();

        if (x < size - 1)
        {
            data += ',';
        }
    }

    if (y < size - 1)
    {
        data += "\n";
    }
}

fs.writeFile(path.join(__dirname, "/tilemap.csv"), data, console.log)
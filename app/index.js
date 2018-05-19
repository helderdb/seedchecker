const match = require('./matches');
const genSeeds = require('./seed');
var fs = require('fs');
const result = genSeeds.genSeeds();
fs.writeFile('output.json', JSON.stringify(result), 'utf8', (err) => {
    console.log(err);
});
console.log(result);
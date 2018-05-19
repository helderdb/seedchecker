var fs = require('fs');

function match() {
    var inputFile = require('./input.json');
    var wordsFile = require('./words.json');
    var input = JSON.parse(fs.readFileSync('./app/input.json', 'utf8'));
    var words = JSON.parse(fs.readFileSync('./app/words.json', 'utf8'));
    console.log(input);
    var result = [];
    input.forEach(inp => {
        words.forEach(word => {
            if (inp === word) {
                result.push(word);
            }
        });
    });

    fs.writeFile('output.json', JSON.stringify(result), 'utf8', (err) => {
        console.log(err);
    });

    return 'done';
}

module.exports.match = match;
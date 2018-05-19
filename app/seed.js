var fs = require('fs');
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
const https = require('https');

function genSeeds() {
    var input = JSON.parse(fs.readFileSync('./app/output.json', 'utf8'));
    var results = [];
    var teststringarray = [];
    var testString = "";
    var lastWord = "";
    var totalSeeds = 0;
    for (var i = 0; i < input.length; i++) {
        teststringarray[0] = input[i];
        for (var j = 0; j < input.length; j++) {
            teststringarray[1] = input[j];
            for (var k = 0; k < input.length; k++) {
                teststringarray[2] = input[k];
                for (var l = 0; l < input.length; l++) {
                    teststringarray[3] = input[l];
                    for (var m = 0; m < input.length; m++) {
                        teststringarray[4] = input[m];
                        for (var n = 0; n < input.length; n++) {
                            teststringarray[5] = input[n];
                            for (var o = 0; o < input.length; o++) {
                                teststringarray[6] = input[o];
                                for (var p = 0; p < input.length; p++) {
                                    teststringarray[7] = input[p];
                                    for (var q = 0; q < input.length; q++) {
                                        teststringarray[8] = input[q];
                                        for (var r = 0; r < input.length; r++) {
                                            teststringarray[9] = input[r];
                                            for (var s = 0; s < input.length; s++) {
                                                teststringarray[10] = input[s];
                                                for (var t = 0; t < input.length; t++) {
                                                    teststringarray[11] = input[t];
                                                    testString = teststringarray[0];
                                                    for (var u = 1; u < 12; u++) {
                                                        testString += " " + teststringarray[u];
                                                    }
                                                    if (bip39.validateMnemonic(testString, input)) {
                                                        results.push(testString);

                                                        var bitcoinNetwork = bitcoin.networks.bitcoin;
                                                        var hdMaster = bitcoin.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(testString), bitcoinNetwork); // seed from above

                                                        var key1 = hdMaster.derivePath('0');
                                                        var addr = key1.keyPair.toWIF();
                                                        console.log(addr);

                                                        // https.get('https://blockchain.info/q/addressfirstseen/' + addr, (res) => {
                                                        //     console.log(res);
                                                        // });
                                                        // console.log("\n\nfound seed: " + testString);
                                                    }
                                                    testString = "";
                                                }
                                            }
                                        }
                                    }

                                    console.log("\nTotal: " + totalSeeds);
                                }
                            }
                        }
                    }
                }
                console.log("\n\ncurrent: " + results);
            }
            console.log("\n\ncurrent: " + results);
            fs.writeFile('output_' + i + '.json', JSON.stringify(results), 'utf8', (err) => {
                console.log(err);
            });
        }
        testString = "";
        if (i === input.length - 12) break;
    }
}
module.exports.genSeeds = genSeeds;
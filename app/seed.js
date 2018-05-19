var fs = require('fs');
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var request = require('request');
var addressesToSearch = [
    "3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8"
];
var input = JSON.parse(fs.readFileSync('./app/SeedInput.json', 'utf8'));

function genSeeds() {
    var results = [];
    var seedArray = [];

    // Currently only 12 words
    for (var i = 0; i < input.length; i++) {
        seedArray[0] = input[i];
        for (var j = 0; j < input.length; j++) {
            seedArray[1] = input[j];
            for (var k = 0; k < input.length; k++) {
                seedArray[2] = input[k];
                for (var l = 0; l < input.length; l++) {
                    seedArray[3] = input[l];
                    for (var m = 0; m < input.length; m++) {
                        seedArray[4] = input[m];
                        for (var n = 0; n < input.length; n++) {
                            seedArray[5] = input[n];
                            for (var o = 0; o < input.length; o++) {
                                seedArray[6] = input[o];
                                for (var p = 0; p < input.length; p++) {
                                    seedArray[7] = input[p];
                                    for (var q = 0; q < input.length; q++) {
                                        seedArray[8] = input[q];
                                        for (var r = 0; r < input.length; r++) {
                                            seedArray[9] = input[r];
                                            for (var s = 0; s < input.length; s++) {
                                                seedArray[10] = input[s];
                                                for (var t = 0; t < input.length; t++) {
                                                    seedArray[11] = input[t];
                                                    validateWords(seedArray, results);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            fs.writeFile('output_' + i + '.json', JSON.stringify(results), 'utf8', (err) => {
                console.log(err);
            });
        }
    }
}

function validateWords(words, results) {
    var seed = words[0];

    for (var i = 1; i < 12; i++) {
        seed += " " + words[i];
    }

    // Clues should come here
    if (bip39.validateMnemonic(seed, input)) {

        var bitcoinNetwork = bitcoin.networks.bitcoin;
        var hdMaster = bitcoin.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(seed), bitcoinNetwork); // seed from above

        var key1 = hdMaster.derivePath("m/0'/0/0");
        var addrWIF = key1.keyPair.toWIF();
        var keyPair = bitcoin.ECPair.fromWIF(addrWIF);
        var pubKey = keyPair.getPublicKeyBuffer();

        var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(bitcoin.crypto.hash160(pubKey));
        var scriptPubKey = bitcoin.script.scriptHash.output.encode(bitcoin.crypto.hash160(redeemScript));
        var address = bitcoin.address.fromOutputScript(scriptPubKey);
        // console.log(address);
        if (addressesToSearch.includes(address)) {
            console.log("Found a seed for address: " + address + " Seed: " + seed);
            results.push(seed);
        }
    }
}

module.exports.genSeeds = genSeeds;
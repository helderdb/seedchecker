var fs = require('fs');
var bip39 = require('bip39');
var bitcoin = require('bitcoinjs-lib');
var addressesToSearch = [
    "3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8",
    "3A1ieb5sqeDTmKhiSt2W955hxugz8JuTf2"
];
var input = JSON.parse(fs.readFileSync('./app/SeedInput.json', 'utf8'));
var results = [];

function genSeeds() {
    var seedArray = [];

    // Currently only 12 words
    for (var i = 0; i < input.length; i++) {
        seedArray[0] = input[i];
        for (var j = 1; j < input.length; j++) {
            seedArray[1] = input[j];
            for (var k = 2; k < input.length; k++) {
                seedArray[2] = input[k];
                for (var l = 3; l < input.length; l++) {
                    seedArray[3] = input[l];
                    for (var m = 4; m < input.length; m++) {
                        seedArray[4] = input[m];
                        for (var n = 5; n < input.length; n++) {
                            seedArray[5] = input[n];
                            for (var o = 6; o < input.length; o++) {
                                seedArray[6] = input[o];
                                for (var p = 7; p < input.length; p++) {
                                    seedArray[7] = input[p];
                                    for (var q = 8; q < input.length; q++) {
                                        seedArray[8] = input[q];
                                        for (var r = 9; r < input.length; r++) {
                                            seedArray[9] = input[r];
                                            for (var s = 10; s < input.length; s++) {
                                                seedArray[10] = input[s];
                                                for (var t = 11; t < input.length; t++) {
                                                    seedArray[11] = input[t];
                                                    validateWords(seedArray);
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

async function validateWords(words) {
    var seed = words[0];

    for (var i = 1; i < words.length; i++) {
        seed += " " + words[i];
    }

    // Clues should come here
    if (bip39.validateMnemonic(seed)) {
        var bitcoinNetwork = bitcoin.networks.bitcoin;
        var hdMaster = bitcoin.HDNode.fromSeedBuffer(bip39.mnemonicToSeed(seed), bitcoinNetwork); // seed from above
        // console.log(seed);
        for (var j = 0; j < 5; j++) {
            var key1 = hdMaster.derivePath("m/49'/0'/0'/0/" + j); // BIP49
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
}

module.exports.genSeeds = genSeeds;

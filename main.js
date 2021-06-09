import Block from './block.js';
import Blockchain from './blockchain';

let taurine = new Blockchain();
let testCoin = new Block(1, "08/06/2021", { amount: 1});
let testCoin2 = new Block(2, "08/06/2021", { amount: 2});
taurine.addBlock(testCoin);
taurine.addBlock(testCoin2);

console.log("Is blockchian valid? " + taurine.isChainValid())

taurine.chain[1].data = {amount: 100};
taurine.chain[1].hash = taurine.chain[1].calculateHash();

console.log("Is blockchian valid? " + taurine.isChainValid())
// console.log(JSON.stringify(taurine, null, 4));
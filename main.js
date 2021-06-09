import Block from './block.js';
import Blockchain from './blockchain';

let taurine = new Blockchain();
console.log("Mining block 1...");
let testCoin = new Block(1, "08/06/2021", { amount: 1});
taurine.addBlock(testCoin);
console.log("Mining block 2...");
let testCoin2 = new Block(2, "08/06/2021", { amount: 2});
taurine.addBlock(testCoin2);
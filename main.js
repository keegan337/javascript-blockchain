import Block from './block.js';
import Blockchain from './blockchain';

let taurineCoin = new Blockchain();
let testCoin = new Block(1, "08/06/2021", { amount: 1});
let testCoin2 = new Block(2, "08/06/2021", { amount: 2});
taurineCoin.addBlock(testCoin);
taurineCoin.addBlock(testCoin2);

console.log(taurineCoin);
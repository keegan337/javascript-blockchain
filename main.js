import Block from './block.js';
import Blockchain from './blockchain';
import Transaction from './transaction';

let taurine = new Blockchain();

taurine.createTransaction(new Transaction('bron','keegan', 100)); // address will be public keys
taurine.createTransaction(new Transaction('keegan','bron', 50));

console.log('\nStarting the miner...');
taurine.minePendingTransactions('mrShark');
console.log("mrShark has ", taurine.getBalanceOfAddress('mrShark'));
console.log('\nStarting the miner again...');
taurine.minePendingTransactions('mrShark');
console.log("mrShark has ", taurine.getBalanceOfAddress('mrShark'));
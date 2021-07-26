import Blockchain from './blockchain';
import Transaction from './transaction';
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('59bc9f5f95b5af23390ad21981fc5b4eee268e3ea3d70ffdbd05d6a5d4f780b3');
const myWalletAddress = myKey.getPublic('hex');
let taurine = new Blockchain();

const trans1 = new Transaction(myWalletAddress, 'some public key', 20);
trans1.signTransaction(myKey);
taurine.addTranscation(trans1);

console.log('\nStarting the miner...');
taurine.minePendingTransactions(myWalletAddress);
taurine.minePendingTransactions(myWalletAddress);
console.log("mrShark has ", taurine.getBalanceOfAddress(myWalletAddress));
console.log('Is chain valid?', taurine.isChainValid())
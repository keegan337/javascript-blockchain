import { SHA256 } from "crypto-js";
import { ec as EC } from 'elliptic';
const ec = new EC('secp256k1');

export default class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    signTransaction(signingKey) {
        if(signingKey.getPublic('hex') != this.fromAddress) {
            throw new Error('You cannot sign this transction for other wallets')
        }
        const transactionHash = this.calculateHash();
        const sig = signingKey.sign(transactionHash, 'base64');
        this.signature = sig.toDER('hex');
    }

    isValid() {
        if(this.fromAddress == null) return true; // for a mining transaction

        if(!this.signature || this.signature.length == 0){
            throw new Error('No signature in this transaction');
        }

        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}
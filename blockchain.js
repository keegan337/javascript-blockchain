import Block from './block';
export default class Blockchain {
    constructor() {
        this.chain = [this.creatGenesisBlock()];
    }

    creatGenesisBlock(){
        return new Block("0", "09/05/1998", "Genesis Block", "From 0 to 1");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
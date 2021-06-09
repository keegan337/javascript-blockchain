import Block from './block';
export default class Blockchain {
    constructor() {
        this.chain = [this.creatGenesisBlock()];
        this.difficulty = 2;
    }

    creatGenesisBlock(){
        return new Block("0", "09/05/1998", "From 0 to 1");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }
        return true;
    }
}
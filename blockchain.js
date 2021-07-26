import Block from './block';
import Transaction from './transaction'
export default class Blockchain {
    constructor() {
        this.chain = [this.creatGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 1;
    }

    creatGenesisBlock(){
        return new Block("09/05/1998", "From 0 to 1", null);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash); // TODO miners need to be able to pick their transactions
        block.mineBlock(this.difficulty);
        console.log("Block succesfully mined!");
        this.chain.push(block);
        this.pendingTransactions=[
            new Transaction(null, miningRewardAddress, this.miningReward) // TODO have peers check mining reward
        ];
    }

    addTranscation(transaction){
        if(!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include to and from address');
        }
        if(!transaction.isValid()) {
            throw new Error('Invalid transaction. Cannot add it to the chain');
        }
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions) {
                if(trans.fromAddress == address){
                    balance -= trans.amount;
                }
                if(trans.toAddress == address){
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            
            if(!currentBlock.hasValidTransaction()) 
            {
                console.log("Invalid transaction", i);
                return false;
            }
            if(currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("Hashes don't match", i);
                return false;           
            }
            if(currentBlock.previousHash !== previousBlock.hash) {
                console.log("Previous block's hash doesn't match", i);
                console.log(previousBlock.hash)
                console.log(currentBlock.previousHash)
                return false
            }

        }
        return true;
    }
}
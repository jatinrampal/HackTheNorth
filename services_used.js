const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(insurance_company, insured, car_make, car_model, policy_id, service_company, service_desc, service_id, service_price){
        this.insurance_company = insurance_company;
        this.insured = insured;
        this.car_make = car_make;
        this.car_model = car_model;
        this.policy_id = policy_id;
        this.service_company = service_company;
        this.service_desc = service_desc;
        this.service_id = service_id;
        this.service_price = service_price;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    //calculate the hash
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
    //difficulty for security
    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Service hash: " + this.hash);
    }
}

//make the blockchain
class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 0;
    }

    createGenesisBlock(){
        return new Block("INS_CO", "NAME", "CAR_MAKE", "CAR_MODEL", "abcde12345", "SERVICE_COMPANY", "SERVICE_DESC", 0);
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Service successfully filed!');
        this.chain.push(block);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash == currentBlock.calculateHash()){
                return true;
            }

            if(currentBlock.previousHash == previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

//new blockchain for claims
let test_01 = new Blockchain();
console.log("Is blockchain valid? ", test_01.isChainValid());
test_01.createTransaction(new Transaction("abcde123_ins", "Joe Bob", "Toyota", "2018 RAV4 LE", "abcde12345", "Bob's Auto Body Shop", "Tire Rotation", "ghi123", 50));
console.log("Is blockchain valid? ", test_01.isChainValid());
test_01.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_01.isChainValid());
test_01.createTransaction(new Transaction("abcde123_ins", "Joe Bob", "Toyota", "2018 RAV4 LE", "abcde12345", "Joe's Towing Service", "Car Towing", "klm456", 275));
console.log("Is blockchain valid? ", test_01.isChainValid());
test_01.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_01.isChainValid());
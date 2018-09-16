const SHA256 = require('crypto-js/sha256');

class Transaction{
    constructor(insurance_company, insured, beneficiary, car_make, car_model, claim_subject, claim_number, claim_amount, policy_id){
        this.insurance_company = insurance_company;
        this.insured = insured;
        this.beneficiary = beneficiary;
        this.car_make = car_make;
        this.car_model = car_model;
        this.claim_subject = claim_subject;
        this.policy_id = policy_id;
        this.claim_number = claim_number;
        this.claim_amount = claim_amount;
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
        console.log("Claim hash: " + this.hash);
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
        return new Block("INS_CO", "NAME1", "NAME2", "CAR_MAKE", "CAR_MODEL", "SUBJECT", 1234567890, 2000, "abcde12345");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Claim successfully filed!');
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
test_01.createTransaction(newTransaction("abcde123_ins", "Joe Bob", "Bob Joe", "Toyota", "2018 AV4 L1", "Head-On Collision", 12344567890, 2000, "abcde12345"));
console.log("Is blockchain valid?", test_01.isChainValid());
test_01.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_01.isChainValid());
//new blockchain for claims
let test_02 = new Blockchain();
console.log("Is blockchain valid? ", test_02.isChainValid());
test_02.createTransaction(newTransaction("abcde123_ins", "Tina Till", "Till Tina", "Honda", "2004 Civic XL", "Pedestrian Collision", 12344567890, 2000, "abcde12345"));
console.log("Is blockchain valid?", test_02.isChainValid());
test_02.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_02.isChainValid());
//new blockchain for claims
let test_03 = new Blockchain();
console.log("Is blockchain valid? ", test_03.isChainValid());
test_03.createTransaction(new Transaction("abcde123_ins", "Bill Homes", "Homes Bill", "Cheverolet", "2012 Avalanche 4XL", "Head-on Collision", 12344567890, 2000, "abcde12345"));
console.log("Is blockchain valid? ", test_03.isChainValid());
test_03.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_03.isChainValid());
//new blockchain for claims
let test_04 = new Blockchain();
console.log("Is blockchain valid? ", test_04.isChainValid());
test_04.createTransaction(new Transaction("abcde123_ins", "Jenya Bo", "Bo Jenya", "Toyota", "2013 Sienna", "Side-Impact Collision", 12344567890, 2000, "abcde12345"));
console.log("Is blockchain valid? ", test_04.isChainValid());
test_04.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_04.isChainValid());
//new blockchain for claims
let test_05 = new Blockchain();
console.log("Is blockchain valid? ", test_05.isChainValid());
test_05.createTransaction(newTransaction("abcde123_ins", "Ron Willis", "Willis Ron", "Toyota", "2018 Corolla", "Rear-End Collision", 12344567890, 2000, "abcde12345"));
console.log("Is blockchain valid?", test_01.isChainValid());
test_05.minePendingTransactions("abcde123_ins");
console.log("Is blockchain valid? ", test_05.isChainValid());

// Bài 3 : Tạo obj bankAccount có balance = 1000 , các method thêm rút tiền 

    export default {
        balance : 1000,

        getBalance(){
            return `Số dư hiện tại : ${this.balance}`
        },

        deposit(money){
            this.balance+=money;
            return this.getBalance()
        },

        withdraw(money){
            if(money > this.balance) return 'Số dư hiện tại không đủ';
            this.balance-=money;
            return this.getBalance()
        }
    }
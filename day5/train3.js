let expenseManager = {
    transactions: [],
    categories: ["Ăn uống", "Di chuyển", "Mua sắm", "Giải trí", "Khác"],
    
    // 1. Thêm giao dịch 
    addTransaction(id , type, amount, category, description = `Giao dịch thành công`) {
        if(!id || !type || !amount || !category || !description){
            console.log(`không đủ dữ liệu của cho 1 giao dịch`) ;
            return null;
        };

        if(this.transactions.find(function(value){
            return value.id === id
        })){
            console.log(`trùng id với 1 giao dịch khác`);
            return null;
        };

        if(amount < 1000 || amount > 100000000){
            console.log(`số tiền không hợp lệ`);
            return null;
        };

        let a = new Date();
        let date = a.getDate() +"/"+a.getMonth() +"/" + a.getFullYear();

        const newTransaction = {
            id : id,
            type : type,
            amount : amount,
            category : category,
            description :description,
            date : date
        };
        this.transactions.push(newTransaction);
        console.log(`thêm giao dịch thành công`)
        return newTransaction;
    },
    
    // 2. Xóa giao dịch theo id
    deleteTransaction(id) {
        if(!id){
            console.log(`id không hợp lệ`);
            return null;
        }
        let index = this.transactions.findIndex(function(value){
            return value.id === id
        });
        if(index < 0 ){
            console.log(`xóa thất bại do không tìm thấy giao dịch có id là ${id}`);
            return null;
        }
        const transactionDeleted = this.transactions[index];
        delete this.transactions[index];
        console.log(`xóa thành công giao dịch có id là ${id}`);
        return transactionDeleted;
    },
    
    // 3. Sửa giao dịch
    updateTransaction(id, type , amount , category , description = `Giao dịch thành công`) {
        if(!id || !type || !amount || !category || !description){
            console.log(`không đủ dữ liệu của cho 1 giao dịch`) ;
            return null;
        };

        let index = this.transactions.findIndex(function(value){
            return value.id === id;
        })
        if(index < 0){
            console.log(`không tồn tại giao dịch có id trên`);
            return null;
        };

        if(amount < 1000 || amount > 100000000){
            console.log(`số tiền không hợp lệ`);
            return null;
        };

        let a = new Date();
        let date = a.getDate() +"/"+a.getMonth() +"/" + a.getFullYear();
    
        this.transactions[index].id = id;
        this.transactions[index].type = type;
        this.transactions[index].amount = amount;
        this.transactions[index].category = category;
        this.transactions[index].description =description;
        this.transactions[index].date = date;
        
        console.log(`cập nhật thành công`);
        return this.transactions[index];
    },
    
    // 4. Tính tổng thu nhập
    totalIncome() {
        let total = 0;
        const transactionsIncome = this.transactions.filter(function(value){return value.type === `income`});
        for(let transactionIncome of transactionsIncome ){
            total+=transactionIncome.amount;
        }
        return total;
    },
    
    // 5. Tính tổng chi tiêu
    totalExpense() {
        let total = 0;
        const transactionsIncome = this.transactions.filter(function(value){return value.type === `expense`});
        for(let transactionIncome of transactionsIncome ){
            total+=transactionIncome.amount;
        }
        return total;
    },
    
    // 6. Tính số dư hiện tại
    balance() {
        return this.totalIncome() - this.totalExpense(); 
    },
    
    // 7. Lọc giao dịch theo category
    filterByCategory(category) {
        let transactionCategory = this.transactions.filter(function(value){return value.category === category});
        return transactionCategory;
    },
    
    // 8. Lọc giao dịch theo khoảng thời gian
    filterByDateRange(startDate, endDate) {
        // Code
    },
    
    // 9. Thống kê chi tiêu theo từng category
    expenseByCategory() {
        // Code
    },
    
    // 10. Hiển thị báo cáo tổng hợp
    showReport() {
        // Code
    }
};

// Test thử
console.log(expenseManager.addTransaction(1,"income", 9000000, "Lương", "Lương tháng 3"));
console.log(expenseManager.addTransaction(2,"expense", 300000, "Ăn uống", "Ăn trưa văn phòng"));
console.log(expenseManager.addTransaction(3,"expense", 300000, "Ăn uống"));

// console.log(expenseManager.deleteTransaction(1));

console.log(expenseManager.updateTransaction(2, "expense" , 150000,"đánh cờ", "đánh cờ cược tiền"));

console.log(expenseManager.totalIncome());

console.log(expenseManager.totalExpense());

console.log(expenseManager.balance());

console.log(expenseManager.filterByCategory("Ăn uống"));


// console.log(expenseManager.transactions);
// expenseManager.showReport();
// Kỳ vọng:
// Tổng thu nhập: 10,000,000
// Tổng chi tiêu: 700,000
// Số dư: 9,300,000
// Chi tiêu theo category:
// - Ăn uống: 300,000
// - Di chuyển: 50,000
// - Mua sắm: 200,000
// - Giải trí: 150,000
// - Khác: 0
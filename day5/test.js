const expenseManager = {
    transactions: [],
    categories: ["Ăn uống", "Di chuyển", "Mua sắm", "Giải trí", "Khác"],
    
    // Helper method
    _getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('vi-VN');
    },
    
    _validateTransaction(id, type, amount, category) {
        if (!id || !type || !amount || !category) {
            console.log('❌ Thiếu dữ liệu cho giao dịch');
            return false;
        }
        
        if (type !== 'income' && type !== 'expense') {
            console.log('❌ Loại giao dịch không hợp lệ. Chỉ chấp nhận "income" hoặc "expense"');
            return false;
        }
        
        if (this.transactions.some(t => t.id === id)) {
            console.log(`❌ ID ${id} đã tồn tại`);
            return false;
        }
        
        if (amount < 1000 || amount > 100000000) {
            console.log('❌ Số tiền không hợp lệ (1000 - 100,000,000)');
            return false;
        }
        
        if (!this.categories.includes(category)) {
            console.log(`❌ Category không hợp lệ. Chấp nhận: ${this.categories.join(', ')}`);
            return false;
        }
        
        return true;
    },
    
    addTransaction(id, type, amount, category, description = '') {
        if (!this._validateTransaction(id, type, amount, category)) return null;
        
        const transaction = {
            id,
            type,
            amount,
            category,
            description: description || `Giao dịch ${type === 'income' ? 'thu' : 'chi'} ${amount.toLocaleString('vi-VN')}đ`,
            date: this._getCurrentDate()
        };
        
        this.transactions.push(transaction);
        console.log(`✅ Thêm giao dịch thành công: ${transaction.description}`);
        return transaction;
    },
    
    deleteTransaction(id) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1) {
            console.log(`❌ Không tìm thấy giao dịch ID ${id}`);
            return null;
        }
        
        const deleted = this.transactions[index];
        this.transactions.splice(index, 1);
        console.log(`✅ Xóa thành công giao dịch ID ${id}: ${deleted.description}`);
        return deleted;
    },
    
    updateTransaction(id, updates) {
        const index = this.transactions.findIndex(t => t.id === id);
        if (index === -1) {
            console.log(`❌ Không tìm thấy giao dịch ID ${id}`);
            return null;
        }
        
        const oldTransaction = this.transactions[index];
        
        // Cập nhật các trường
        const updated = { ...oldTransaction, ...updates };
        
        // Kiểm tra dữ liệu mới
        if (!this._validateTransaction(updated.id, updated.type, updated.amount, updated.category)) {
            return null;
        }
        
        updated.date = this._getCurrentDate();
        this.transactions[index] = updated;
        
        console.log(`✅ Cập nhật thành công giao dịch ID ${id}`);
        return updated;
    },
    
    totalIncome() {
        return this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
    },
    
    totalExpense() {
        return this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
    },
    
    balance() {
        return this.totalIncome() - this.totalExpense();
    },
    
    filterByCategory(category) {
        const filtered = this.transactions.filter(t => t.category === category);
        console.log(`📂 Tìm thấy ${filtered.length} giao dịch thuộc danh mục "${category}"`);
        return filtered;
    },
    
    filterByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        if (isNaN(start) || isNaN(end)) {
            console.log('❌ Ngày không hợp lệ. Định dạng: YYYY-MM-DD');
            return [];
        }
        
        const filtered = this.transactions.filter(t => {
            const [day, month, year] = t.date.split('/');
            const transDate = new Date(`${year}-${month}-${day}`);
            return transDate >= start && transDate <= end;
        });
        
        console.log(`📅 Tìm thấy ${filtered.length} giao dịch từ ${startDate} đến ${endDate}`);
        return filtered;
    },
    
    expenseByCategory() {
        const stats = {};
        this.categories.forEach(cat => stats[cat] = 0);
        
        this.transactions
            .filter(t => t.type === 'expense')
            .forEach(t => stats[t.category] += t.amount);
        
        return stats;
    },
    
    showReport() {
        const totalIncome = this.totalIncome();
        const totalExpense = this.totalExpense();
        const balance = this.balance();
        const expenseStats = this.expenseByCategory();
        
        console.log('\n' + '='.repeat(55));
        console.log('📊 BÁO CÁO TỔNG HỢP CHI TIÊU');
        console.log('='.repeat(55));
        
        console.log(`\n💰 TỔNG THU: ${totalIncome.toLocaleString('vi-VN')}đ`);
        console.log(`💸 TỔNG CHI: ${totalExpense.toLocaleString('vi-VN')}đ`);
        console.log(`💵 SỐ DƯ: ${balance.toLocaleString('vi-VN')}đ`);
        
        if (balance >= 0) {
            console.log(`📈 Tình hình: Chi tiêu trong tầm kiểm soát`);
        } else {
            console.log(`⚠️ Tình hình: Đã chi vượt quá thu nhập`);
        }
        
        console.log('\n📈 CHI TIÊU THEO DANH MỤC:');
        console.log('-'.repeat(55));
        
        const sortedStats = Object.entries(expenseStats)
            .filter(([, amount]) => amount > 0)
            .sort(([, a], [, b]) => b - a);
        
        if (sortedStats.length === 0) {
            console.log('   Chưa có giao dịch chi nào');
        } else {
            sortedStats.forEach(([category, amount]) => {
                const percent = totalExpense > 0 ? (amount / totalExpense * 100).toFixed(1) : '0';
                const bar = '█'.repeat(Math.floor(percent / 2));
                console.log(`  ${category.padEnd(12)}: ${amount.toLocaleString('vi-VN').padStart(12)}đ (${percent}%) ${bar}`);
            });
        }
        
        console.log('\n🕐 5 GIAO DỊCH GẦN NHẤT:');
        console.log('-'.repeat(55));
        
        const recent = [...this.transactions].reverse().slice(0, 5);
        recent.forEach(t => {
            const icon = t.type === 'income' ? '📈' : '📉';
            const typeLabel = t.type === 'income' ? 'THU' : 'CHI';
            console.log(`  ${icon} ${t.date.padEnd(10)} | ${t.category.padEnd(12)} | ${typeLabel} ${t.amount.toLocaleString('vi-VN').padStart(12)}đ`);
            console.log(`     📝 ${t.description}`);
        });
        
        console.log('\n' + '='.repeat(55) + '\n');
    }
};

console.log(expenseManager.addTransaction(12,`income`,90000000,`Khác`));
console.log(expenseManager.addTransaction(13,`expense`,300000,`Ăn uống`,`nhậu`));
expenseManager.updateTransaction(14,'expense',450000,'Ăn uống','chơi');
console.log(expenseManager.totalExpense());
console.log(expenseManager.totalIncome());
console.log(expenseManager.balance());
expenseManager.showReport();
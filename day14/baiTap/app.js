// import các file khác để sử dụng 

    import user from './bai1.js';
    console.log(user?.getFullName() ?? 'Chưa có name');
    console.log(user?.getYear() ?? 'Chưa có year');

    import counter from './bai2.js';
    console.log(counter?.increment());
    console.log(counter?.increment());
    console.log(counter?.increment());
    console.log(counter?.reset());
    console.log(counter?.decrement());
    
    import banking from './bai3.js';
    console.log(banking.deposit(2000))
    console.log(banking.withdraw(5000))
    console.log(banking.withdraw(3000))

    import clock from './bai4.js';
    clock.start();
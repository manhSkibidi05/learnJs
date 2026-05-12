// Bài 1 : Chuyển Promise sang Async/Await

// Đề bài : Chuyển các bài tập Promise từ ngày 8 (bài 1 -> bài 5) sang async/await

    // Bài 1 : Tạo Promise đơn giản 
    // đề bài : tạo hàm wait(ms) trả về 1 Promise . Promise sẽ resolve sau ms miligay với thông báo "đã chờ X giây ms" -> dùng then để in ra kết quả 

    async function wait(ms){
        try{
            const result = await new Promise((resolve , reject) => {setTimeout(() => {resolve(`Đã chờ ${ms} giây`)},ms)});
            console.log(result)
        }catch(err){
            console.log(err.message);
        }
    }
    wait(1000);

    // Bài 2 : Promise với reject 
    // đề bài : tạo hàm checkAge(age) trả về Promise -> age >= 18 thì resolve đủ tuổi < 18 thì reject chưa đủ -> dùng then và catch để xử lý
    
    async function checkAge(age){
        try{
            if(age >= 18 )  result = await Promise.resolve(`Đủ trình`);
            else throw new Error(`Đéo đủ trình`);
            console.log(result);
        }catch(err){
            console.log(err.message)
        }
    }
    checkAge(19);
    checkAge(11);

    // Bài 3 : Chuỗi Promise cơ bản 
    // đề bài : tạo hàm double(x) trả về Promise resolve x * 2 sau 1s , tạo addTen(x) trả về Promise resolve với x + 10 sau 1s
    // viết chuỗi nhận 5 -> double -> addTen -> in ra đáp án

    async function chainPromise(num){
        try{
            if(!Number.isFinite(num)) throw new Error(`Không phải 1 số`);
            let rs1 = await new Promise((resolve , reject) => setTimeout(() => {resolve(num*2)},1000));
            let rs2 = await new Promise((resolve , reject) => setTimeout(() => {resolve(rs1 + 10)},1000));
            console.log(rs2)
        }catch(err){
            console.log(err.message)
        }
    }
    chainPromise(10);
    chainPromise("dit");
// Cấp độ 1 : Cơ bản 

// Bài 1 : Tạo Promise đơn giản 

// đề bài : tạo hàm wait(ms) trả về 1 Promise . Promise sẽ resolve sau ms miligay với thông báo "đã chờ X giây ms" -> dùng then để in ra kết quả 

    function wait(ms){
        return new Promise((resolve , reject)=>{
            setTimeout(()=>{
                resolve(`đã chờ ${ms} ms`);
            },ms);
        });
    }

    const pWait = wait(1000);
    pWait.then(value => console.log(value));

// Bài 2 : Promise với reject 
    
// đề bài : tạo hàm checkAge(age) trả về Promise -> age >= 18 thì resolve đủ tuổi < 18 thì reject chưa đủ -> dùng then và catch để xử lý 

    function checkAge(age){
        return new Promise((resolve , reject)=>{
            if(age >= 18) resolve(`đủ trình`);
            else reject(`chưa đủ trình`);
        })
    }

    checkAge(10).then(value => console.log(value)).catch(reason => console.log(reason));

// Bài 3 : Chuỗi Promise cơ bản 

// đề bài : tạo hàm double(x) trả về Promise resolve x * 2 sau 1s , tạo addTen(x) trả về Promise resolve với x + 10 sau 1s
// viết chuỗi nhận 5 -> double -> addTen -> in ra đáp án 

    function double(x){
        return new Promise((resolve , reject)=>{
            setTimeout(()=>{
                resolve(x*2);
            },1000)
        })
    }

    function addTen(x){
        return new Promise((resolve , reject)=>{
            setTimeout(()=>{
                resolve(x + 10);
            },1000)
        })
    }

    // cách 1 :
    double(5).then(value => addTen(value)).then(value => console.log(value));

    // cách 2 :
    double(5).then(value =>{return new Promise((resolve , reject)=>{
            setTimeout(()=>{
                if (value > 10) reject(`lỗi`);
                else resolve(value + 10);
            },1000);
        });
    }).then(value => {return new Promise((resolve , reject)=>{
        setTimeout(()=>{
            if(value >= 20) reject(`lỗi 2`);
            else resolve(value + 20);
        },1000)
    })}).then(value => value + 10).catch(reason => console.log(reason)).then(value => console.log(value));
// Bài tập về bất đồng bộ với callback cấp độ 1

// Bài 1.1 : delay message

function delayMessage(message , delay , callback){
    console.log(`đang chờ tin nhắn...`)
    setTimeout(()=>{
        console.log(message);
        callback(null , message);
    },delay)
}

delayMessage(`hello em có khỏe khum`,1000,(err , message)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`callback đang chạy : ${message}`);
    }
});

// Bài 1.2 : tính toán bất đồng bộ 

function asyncAdd(a , b , callback){
    console.log(`đang chờ tính toán...`);
    setTimeout(()=>{
        if(a === 0 && b === 0){
            callback(`lỗi cả a và b bằng 0` , null);
        }else{
            const sum = a + b;
            callback(null , sum);
        }
    },1000)
}

asyncAdd(0 , 0 , (err , sum)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`tổng bằng : ${sum}`);
    }
});

// Bài 1.3 : đọc số từ mảng mỗi số được in ra sau mỗi 500ms

function processNumber(numbers , callback){
    let index = 0;
    
    function recursiveNumber(){
        if(index === numbers.length){
            callback(null , `hoàn thành`);
            return;
        }

        setTimeout(()=>{
            console.log(numbers[index])
            index++;
            recursiveNumber();
        },500);
    }

    recursiveNumber();
}

processNumber([5,10,15,20,25,30] , (err , result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
})

// Bài 1.4 : hàm retry đơn giản 

function unreliableTask(callback){
    const success = Math.random() > 0.5;
    setTimeout(()=>{
        if(success){
            callback(null , `thành công đăng nhập`);
        }else{
            callback(`thất bại đăng nhập`);
        }
    },500);
}

function retryTask(task , retries , callback){
    let count = 1;
    function recursiveTask(){
        task((err , message)=>{
            if(!err){
                callback(null , message);
            }
            else if(count <= retries){
                console.log(`lần thử thứ ${count} thất bại. Thử lại...`);
                count++;
                recursiveTask();
            }
            else{
                callback(`quá ba lần thử lại . lỗi`,null);
            }
        });
    }
    recursiveTask();
}

retryTask(unreliableTask , 3 , (err , message)=>{
    if(err){
        console.log(err)
    }else{
        console.log(message);
    }
})

// - hàm bất đồng bộ với callback là khi gọi hàm callback sẽ phải đợi dữ liệu lấy từ bên ngoài vào sau đó truyền vào hàm callback
    // -> callback sẽ trả lại dữ liệu tính toán cuối cùng 
// - hàm bất đồng bộ được đưa sang web api để thực hiện các tác vụ phía sau nó tranh gây đứng web khi đợi hàm bất đồng bộ chạy 
    // -> sau khi chạy hết tác vụ phía dưới call stack rỗng lúc này đưa lại hàm callback vào để chạy 
// - tránh biến toàn cục sử dụng với xử lí bất đồng bộ 
// - dùng đệ quy với các tác vụ có độ trễ nhất định
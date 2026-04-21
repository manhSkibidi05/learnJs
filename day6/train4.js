// Bài tập về bất đồng bộ với callback cấp độ 2 

// bài 2.1 : xử lí tuần tự với bất đồng bộ

function task1(arr , callback){
    setTimeout(()=>{
        if(Array.isArray(arr)){
            arr.push(36);
            callback(null , arr);
        }else{
            callback(`lỗi mảng`, null)
        }
        
    },1000)
}

function task2(arr , callback){
    setTimeout(()=>{
        if(Array.isArray(arr)){
            arr.push(37);
            callback(null , arr);
        }else{
            callback(`lỗi mảng`,null)
        }
    },1000)
}

let tasks = [task1 , task2];
function runSequential(tasks, initialData, finalCallback) {
    let index = 0;
    let currentData = initialData;
    
    function next() {
        if (index >= tasks.length) {
            finalCallback(null, currentData);
            return;
        }
        
        const task = tasks[index];
        task(currentData, (err, result) => {
            if (err) {
                finalCallback(err, null);
                return;
            }
            currentData = result;
            index++;
            next();
        });
    }
    
    next();
}

// Sử dụng
runSequential(tasks, [33, 34, 35], (err, result) => {
    if (err) console.log(err);
    else console.log(result); // [33, 34, 35, 36, 37]
});

// Bài 2.2 : xử lí bất đồng bộ với song song

// hàm bất đồng bộ có 2 tham số 1 mảng và 1 hàm callback
function task3(arr , callback){
    // thao tác làm bất đồng bộ là sử dụng hàm setTimeout -> chuyển hàm callback của setTimeout sang web api 
    // thực hiện xong các tác vụ ở dưới đưa lại hàm callback vào call stack chạy sau 1000ms 
    // gọi hàm callback của task3 truyền dữ liệu vào nó -> sau đó callback sẽ trả về dữ liệu cuối cùng  
    setTimeout(()=>{
        if(Array.isArray(arr)){
            if(arr.length > 1){
                arr.pop();
            }
            callback(null , arr);
        }else{
            callback(`lỗi mảng` , null);
        }
    },1000)
}

function task4(arr , callback){
    setTimeout(()=>{
        if(Array.isArray(arr)){
            if(arr.length > 1){
                arr.pop();
            }
            callback(null , arr);
        }else{
            callback(`lỗi mảng` , null);
        }
    },700)
}

// hàm tác vụ chạy song song với 3 tham số -> task :chứa các task cần chạy 
// numbers : mảng số , callback : hàm callback trả về dữ liệu cuối
function runParallel(tasks , numbers ,callback){
    // mảng results lưu kết quả của các task rồi truyền vào callback cuối
    let results = [];
    // biến complete đếm xem khi nào chạy hết các task 
    let complete = 0;
    // mảng tasks gọi hàm forEach -> lặp với mỗi giá trị có trong mảng thực hiện hàm callback của forEach
    tasks.forEach((task , index)=>{
        // gọi ra hàm bất đồng bộ truyền vào tham số cần thiết 
        task(numbers , (err , arr)=>{
            // hàm bất đồng bộ chạy sau khi thực hiện hết các thao tác khác ngoài hàm -> ta sẽ có index hàm bất đồng bộ đang chờ thời gian để chạy 
            // sau khi xong thời gian chờ -> đưa lại vào call stack chạy các lệnh bên trong hàm callback
            // kiểm tra lỗi
            if(err){
                // nếu lỗi gọi callback cuối cùng -> kết thúc hàm luôn
                callback(err,null);
                return;
            }
            // nếu không lỗi -> lưu giá trị của từng task vào mảng kết quả cuối dựa trên vị trí index của hàm
                results[index] = arr;
                // tăng 1 đơn vị
                complete++;
                // nếu biến đếm = với kích thước mảng -> chạy hết các task 
                if(complete === tasks.length){
                    // trả về dữ liệu cuối cùng
                    callback(null , results);
                }
            
        })
    })
    
}

const tasks2 = [task3 , task4]
runParallel(tasks2 , `concak` , (err , results)=>{
    if(err) console.log(err);
    else console.log(results);
})

// Bài 2.3 : trả về kết quả của task nhanh nhất 
// task bất đồng bộ -> khi gọi thì đợi thời gian quy định rồi mới chạy callback 
function task5(callback){
    setTimeout(()=>{
        callback(null , `task thu 1`);
    },1500)
};

function task6(callback){
    setTimeout(()=>{
        callback(null , `task thu 2`)
    },1000)
}
// hàm đua với tham số : tasks -> chứa các task cần chạy , callback trả về dữ liệu cuối
function race(tasks,callback){
    // biến check -> nếu task nào chạy xong trước sẽ thay đổi dữ liệu biến 
    let isCompleted = false;
    // chạy các hêt các task
    tasks.forEach(task=>{
        // đưa task vào chạy -> các task có trong mảng sẽ được chạy toàn bộ đưa ra web api 
        // sau khi call stack rảnh -> đợi thời gian chạy của các task 
        task((err , message)=>{
            // task nào hoàn thành trước sẽ thay đổi giá trị của biến check
            // kiểm tra biến check đã thay đôi chưa
            if(isCompleted === true) return;
            // kiểm tra lỗi
            if(err) return;
            // thay đổi giá trị
            isCompleted = true;
            // gọi callback cuối truyền vào giá trị mà task hoàn thành trước 
            callback(null , message);
        })
    })
}
let tasks3 = [task5 ,task6]
race(tasks3 , (err , result)=>{
    if(err) console.log(err);
    else console.log(`nguoi chien thang la : ${result}`);
})

// Bài 2.4 : hủy task nếu quá thời gian 

function slowTask(callback){
    setTimeout(()=>{
        callback(null , `tiến trình hoàn tất`);
    },1000);
}
function withTimeout(task , timeout , callback){
    // biến check 
    let isDone = false;
    // biến kết quả cuối
    let result = `quá thời gian quy định`
    // task cần chạy -> nếu task chạy hoàn thành trước 
    task((err , message)=>{
        // thay đổi biến check
        isDone = true;
        // kiểm tra lỗi 
        if(err){
            // nếu lỗi trả về lỗi cho callback cuối
            callback(err , null);
        } 
        else {
            // nếu không lỗi -> trả về thông báo task hoàn thành trc thời gian đếm
            result = message;
            callback(null , result);
        }
    });
    // máy đếm giờ -> nếu máy đếm hoàn thành trước 
    setTimeout(()=>{
        // trả về thông báo máy đếm hoàn thành trc task
        callback(null , result);
    },timeout);
}
withTimeout(slowTask , 500 , (err , result)=>{
    if(err) console.log(err);
    else console.log(result);
});

// Bài 2.5 : retry với delay

function taskRandom(callback){
    setTimeout(()=>{
        let result = Math.random();
        if(result > 0.5) callback(null , false);
        else callback(null , true);
    },500)
}

function retryWithDelay(task , maxRetries, delay  ,callback){
    let retry = 1;

    function recursiveCase(){
        if(retry >= maxRetries){
            callback(`sai quá số lần quy định` , null);
            return;
        }

        task((err , result)=>{
            if(err) return;
            if(result){
                callback(null , `nhập thành công`);
                return;
            }
            console.log(`sai lần thứ ${retry}`)
            retry++;
            setTimeout(()=>{
                recursiveCase();
            },delay)
            console.log(`đang chời thời gian nhập tiếp theo...`);
        })
    }
    recursiveCase();
}

retryWithDelay(taskRandom , 5 ,2000 ,(err , result)=>{
    if(err) console.log(err);
    else console.log(result);
})
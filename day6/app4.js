// Các cách xử lí với hàm bất đồng bộ :

// 1. khái niệm về task và hàm bất đồng bộ
    // - task : trong ngữ cảnh xử lí bất đồng bộ là một hàm bất đồng bộ 
    // -> một hàm bất đồng bộ chứa các thao tác cần thời gian chờ 
    // -> vì 1 task là 1 hàm bất đồng bộ nên nó chỉ xử lí 1 việc 

    // - Các đặc điểm của 1 task (1 hàm bất đồng bộ)

    // 1. không trả về giá trị trực tiếp 
    // vd : hàm đồng bộ
        function syncTask1() {
            return 42; // Trả về ngay
        }
        console.log(syncTask1());
    // vd : hàm bất đồng bộ
        function syncTask2(callback){
            setTimeout(()=>{
                console.log(callback(42));
            },1000);
            return 0;
        }
        console.log(syncTask2(result => result - 6));

        // -> khi sử dụng hàm bất đồng bộ khi return kết quả nhưng hàm chưa kết thúc luôn vì còn thao tác cần thời gian chờ để chạy 
        // -> vậy nên với hàm bất đồng bộ không cần return kết quả vì còn đợi các thao tác cần thời gian để chạy in ra kết quả sau cùng

    // 2. có hàm callback để nhận kết quả 
        function syncTask3(food, callback){
            let arr = [`bánh chuối`,`nem nướng`,`xiên bẩn`];
            let result = arr.find(value=> value === food);
            setTimeout(()=>{
                callback(result);
            },1000);
            console.log(`đang chờ kết quả ...`);
        }
        syncTask3(`con cak` , result => {
            if(result){
                console.log(`vẫn còn ${result} nhé`);
            }else{
                console.log(`khum có nhé`);
            }
        });

        // -> hàm callback nhận kết quả sau khi thông qua các thao tác kiểm tra 
        // -> sau đó hàm callback dựa vào kết quả đó trả về kết quả hợp lí 

    // 3. không block code phía dưới 
        // -> với js chạy theo 1 luồng nên chạy tuần tự từ trên xuống dưới nhưng với hàm bất đồng bộ có các thao tác gây mất thời gian 
        // -> các thao tác gây mất thời gian đó chuyển sang luồn khác làm trống call stack cho code phía dưới chạy trước 
        // -> sau khi chạy xong các code phía dưới gửi lại thao tác tốn thời gian vào call stack đang trống để chạy

// 2. Cách xử lí tuần tự với hàm bất đồng bộ 

    // 2.1. cơ chế hoạt động 
    // Đây là 3 task bất đồng bộ khác nhau : 
    function task1(callback){
        setTimeout(()=>{
            console.log(`task 1 hoàn thành`);
            callback(null , `kết quả 1`);
        }, 1000);
    }

    function task2(preResult , callback){
        setTimeout(()=>{
            console.log(`task 2 hoàn thành với input : ${preResult}`);
            callback(preResult , `kết quả 2`);
        } , 1000);
    }

    function task3(preResult , callback){
        setTimeout(()=>{
            console.log(`task 3 hoàn thành với input : ${preResult}`);
            callback(preResult , `kết quả 3`);
        } , 1000)
    }

    function senquentialProcessing(){
        console.log(`Bắt đầu xử lí tuần tự : `);

        task1((err , result1)=>{
            console.log(`kết quả của task 1 : ${result1} `);
            task2(result1 ,(result1 , result2)=>{
                console.log(`kết quả của task 2 : ${result2}`);
                task3(result2 , (result2 , result3) =>{
                    console.log(`kết quả của task 3 : ${result3}`);
                })
            })
        })

        console.log(`waiting for u ...`);
    }
    senquentialProcessing();

    // 2.2. call stack và event loop tuần tự 
        // - gọi hàm chạy tiến trình xử lí tuần tự :
            // + chạy lệnh :  bắt đầu xử lí tuần tự
            // + gọi task 1 -> task 1 với là hàm bất đồng bộ đưa setTimeout vào kênh web API 
            // + task 1 đưa ra khỏi call stack -> chạy tiếp lệnh : waiting for u ...
            // + call stack trống -> event loop đưa callback của task 1 vào call stack sau 1s
            // + task 1 chạy gọi task 2 -> đưa task 2 vào kệnh web API 
            // + nếu không có lệnh nào -> event loop đưa callback task 2 vào call stack sau 1s
            // + lặp lại cho tới khi hết .
    
    // 2.3. vận dụng 

    function taskNum1(number , callback ){
        if(!number){
            number = 0;
        }
        setTimeout(()=>{
            callback(number);
        },1000);
        console.log(`task 1 đang chạy...`);
    }

    function taskNum2(preNumber , callback){
        setTimeout(()=>{
            callback(preNumber);
        },1000);
        console.log(`task 2 đang chạy...`);
    }

    function taskNum3(preNumber , callback){
        setTimeout(()=>{
            callback(preNumber);
        }),1000;
        console.log(`task 3 đang chạy...`);
    }

    function tuanTu(){
        console.log(`bắt đầu chạy tuần tự : `);
        taskNum1(10 , result=>{
            result+=10;
            console.log(`kết quả sau task 1 là : ${result}`);

            taskNum2(result, result=>{
                result+=10;
                console.log(`kết quả sau task 2 là : ${result}`);

                taskNum3(result ,result=>{
                    result+=10;
                    console.log(`kết quả sau task 3 là : ${result}`);
                })
            })
        })
    }

    tuanTu();

    // -> với xử lí bất đồng bộ bằng tuần tự áp dụng với khi các hàm sử dụng lại dữ liệu đã được sử lí từ hàm trước nó 
    // -> tuần tự xử lí sẽ gây tốn thời gian vì mỗi hàm sẽ chạy tuần từ lần lượt đợi kết quả từ task trước nó trả về 

    // TUẦN TỰ:
    // Call Stack: [task1] → [task1 callback, task2] → [task2 callback, task3]
    // Web APIs: [timer1] → [timer2] → [timer3]
    // Task Queue: [callback1] → [callback2] → [callback3]
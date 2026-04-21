// - Hàm bất đồng bộ : trong hàm có các thao tác cần thời gian để xử lí 
    // + hàm bất đồng bộ thường không return vì cần đợi các thao tác cần thời gian xử lí -> rồi mới trả về dữ liệu
    // + hàm callback nhận dữ liệu 
    // + các thao tác cần thời gian xử lí sẽ được chuyển sang -> web api để call stack trống để có thể chạy các lệnh phía dưới 

// - Các cách xử lí với hàm bất đồng bộ :

    // - xử lí tuần tự :
        // - dữ liệu của các hàm sau sẽ phụ thuộc dữ liệu của hàm trước 
        // -> vì mỗi lần chỉ có  1 hàm chạy nên sẽ gây tốn thời gian chạy 

        let user = {
            nam : {id : 1 , sport : `football`},
            hai : {id : 2 , sport : `chess`}
        }
        let repo ={
            1 : {slot1 : `money` , slot2 :`key` },
            2 : {slot1 : `book` , slot2 : `lego`}
        }
        function getUserId(userName , callback){
            console.log(`đang tìm userName...`);
            setTimeout(()=>{
                callback(userName);
            },1000)
        }

        function getSlotById(idSlot , callback){
            console.log(`đang tìm slot...`);
            setTimeout(()=>{
                callback(idSlot);
            },1000)
        }

        function tuanTu(){
            console.log(`bắt đầu chạy tuần tự...`);
            getUserId(`nam` , userName=>{
                if(user[userName]){
                    console.log(`đã tìm thấy userName ${userName}`)
                }else{
                    console.log(`không tồn tại userName`)
                }
                getSlotById(user[userName].id , id=>{
                    if(!user[userName].id){
                        console.log(`không có tủ đồ`);
                    }else{
                        console.log(repo[id]);
                    }
                })
            })
        }
        tuanTu();

    // - xử lí song song 
        // -> các task không liên quan đến nhau : mỗi task xử lí 1 việc khác nhau không liên quan đến task trước
        // -> mỗi task sẽ có thời gian chờ dữ liệu trả về khác nhau -> task nào xong trước sẽ được chạy trước
    arr = [`bánh`,`kẹo`,`mứt`,`dưa hấu`,`vua`]
    function task1(arr , callback){
        console.log(`đang chờ task 1 chạy...`);
        setTimeout(()=>{
            let firstIndex = arr[0];
            callback(firstIndex);
        }, Math.random() * 2000)
    }

    function task2(arr , callback){
        console.log(`đang chờ task 2 chạy...`);
        setTimeout(()=>{
            let lastIndex = arr[arr.length - 1];
            callback(lastIndex);
        }, Math.random() * 2000)
    }

    function songSong(){
        console.log(`Bắt đầu chạy song song...`);
        task1(arr , value=>{
            console.log(`task 1 chạy hoàn thành với giá trị là : ${value}`)
        });
        task2(arr , value=>{
            console.log(`task 2 chạy hoàn thành với giá trị là : ${value}`)
        });
    }

    // Phân tích :
            // B1 : gọi hàm songSong()
            // B2 : gọi task1 -> gọi timeout đưa vào web api
            // B3 : gọi task2 -> gọi timeout đưa vào web api
            // B4 : chạy lệnh console
            // B5 : lúc này trong web api có 2 task chạy đồng thời
            // B6 : task2 xong trước -> đưa vào call stack chạy , task1 xong sau -> đưa vào call stack chạy
            // B7 : kết thúc
            // -> các callback chạy khi có thể không chờ nhau
        // SONG SONG:
            // Call Stack: [task1, task2, task3] (gần như cùng lúc)
            // Web APIs: [timer1, timer2, timer3] (chạy song song)
            // Task Queue: [callback1, callback2, callback3] (theo thứ tự hoàn thành)

    // - xử lí với Timeout : giới hạn thời gian cho 1 task -> vd : hủy task nếu quá thời gian 

        // TIMEOUT:
            // Call Stack: [task_with_timeout]
            // Web APIs: [task_timer, timeout_timer] (2 timer chạy đua)
            // Task Queue: [callback_nào_xong_trước]
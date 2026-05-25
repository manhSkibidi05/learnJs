// Ôn tập về tư duy state -> render  

    // state là gì : Là những giá trị ảnh hưởng tới việc các phần tử sẽ được hiển thị trên giao diện 
    // -> state đóng vai trò như 1 nơi lưu trữ các giá trị khi thay đổi các giá trị này sẽ thay đổi giao diện 

    // render là gì : Là 1 hàm giúp hiển thị giao diện dựa trên state 
    // -> hàm render() sẽ phụ thuộc vào state khi state thay đổi sẽ ảnh hưởng tới render()

    // các thao tác cơ bản để xử lí 1 trang web nhỏ theo tư duy state -> render 
    // sơ đồ hoạt động : state -> render -> sự kiện diễn ra ở DOM tác động tới state -> state -> render...

        // - xác định các biến state -> xác định các giá trị gây ảnh hưởng tới trang web
        let tasks = [];
        let taskState = `all`;

        // - định nghĩa hàm render -> dựa trên các state định nghĩa trang web hiện thị dựa trên các state tại thời điểm đó 
        function render(){
            // - xác định container -> nơi chứa các phần tử con có thể thay đổi dựa trên sự kiện 
            const container = document.querySelector(`.container`);
            container.innerHTML = ``;

            // - hàm khởi tạo phần tử html -> tạo ra phần tử html có thể thêm thuộc tính và sự kiện nếu cần thiết 
            function createElement(tasks){

            }
        }

        // - định nghĩa các hàm có gây ảnh hưởng tới state -> dựa trên các sự kiện DOM , các hàm chỉ tác động tới state không tác động tới DOM (thêm , sửa
        // xóa ... phần tử html) và sau mỗi thao tác với state gọi lại render ()

        function addTask(task){
            tasks.push(task);
            render();
        }

        function deleteTask(id){
            let pos = tasks.findIndex(task => task[`id`] === id);
            if(pos !== -1) tasks.splice(pos , 1);
            render();
        }

        // - các phần tử DOM bên ngoài (không nằm trong container -> sẽ thay đổi liên tục nên cần gán lại sự kiện cho các phần tử đó mỗi khi render)
        //  sẽ có các sự kiện gây ảnh hưởng tới state 

        let inputTask = document.querySelector(`.input-task`);
        let btnAdd = document.querySelector(`.btn-add`);
        btnAdd.addEventListener(`click` , () => {
            let newTask = {content : inputTask};
            addTask(newTask);
        })

        
        // Thay vì việc lấy các giá trị phần tử DOM rồi thao tác trực tiếp các giá trị đó thì 
        // -> tư duy state giúp tách biệt logic code với các thao tác trực tiếp với DOM 
        // -> các thao tác với DOM chỉ diễn ra trong hàm render các phần tử hiện thị do state quyết định
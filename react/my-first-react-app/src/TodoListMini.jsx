// Định nghĩa module todo list mini 

    // muốn sử dụng hàm useState từ react cần import nó
    import {useState} from 'react';
    import styles from './TodoList.module.css'

    // định nghĩa component
    function TodoList(){
        // khởi tạo các giá trị state tử hàm useState() nhận đối số = giá trị ban đầu của state 
        // -> useState() trả về 1 mảng có đúng 2 phần tử , ptu đầu state dùng để đọc dữ liệu để hiện thị lên giao diện 
        // -> ptu sau là setState cho phép thay đổi giá trị state rồi re-render lại component 
        const [tasks , setTasks] = useState([]);
        const [text , setText] = useState('');

        // hàm thêm phần tử mới vào state tasks
        function addTask(value){
            // tạo ra biến task mới dựa trên dữ liệu nhận được
            const newTask = {
                id : new Date().getTime(),
                title : value,
                completed : false
            };
            // chỉnh sửa biến state thông qua hàm setter
            setTasks([...tasks , newTask]);
            setText('');
        }

        // hàm cập nhật lại giá trị bên trong state 
        function updateChecked(id){
            // dựa trên giá trị nhận được 
            setTasks(
                // tasks.map trả về 1 mảng mới với các giá trị được thay đổi thông qua hàm callback
                tasks.map(task => 
                    // kiểm tra nếu id của 1 task = id cần tìm -> khởi tạo task mới và cập nhật thông tin task đó
                    // nếu không = trả về task ban đầu
                    task.id === id ? {...task , completed : !task.completed} : task
                )
            )
        }

        // hàm xóa task 
        function removeTask(id){
            // dùng tasks.filter trả về 1 mảng mới với các giá trị được lọc dựa trên hàm callback
            setTasks(tasks.filter(val => val.id !== id))
        }

        // - state chỉ dùng để đọc và gán cho các thuộc tính cần để hiện thị giao diện
        // - muốn thay đổi dùngg hoàn toàn = setState để có thể cập nhật giá trị nhanh và chuẩn xác nhất 

        return(
            // bắt đầu mã jsx -> muốn nhúng js phải dùng qua dấu {}
            <div className={styles.container}>
                <h1>Todo List Mini</h1>
                <div className={styles.addSection}>
                    <input id='todoInput' placeholder='Nhập công việc mới...' type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button id='addBtn' onClick={() => addTask(text)}>Thêm</button>
                </div>
                
                <ul id='todoList'>
                    {
                        // nhúng js và kết hợp với mã jsx trả về 1 mảng jsx -> vì bên trong {} vẫn có thể viết mã jsx và js
                        tasks.map(task =>  
                            <div className={styles.todoItem} key={task.id}>
                                <input type="checkbox" checked={task.completed} onChange={() => updateChecked(task.id)}/>
                                <span>{task.title}</span>
                                <button className={styles.deleteBtn} onClick={() => removeTask(task.id)}>Xóa</button>
                            </div>
                        )
                    }
                </ul>
            </div>
        )
    }

    // cho phép file khác import về để sử dụng 
    export default TodoList
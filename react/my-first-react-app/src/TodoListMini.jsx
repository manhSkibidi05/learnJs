// Định nghĩa module todo list mini 

    import {useState , useEffect} from 'react';
    import styles from './TodoList.module.css'

    
    function TodoList(){ 
        const [tasks , setTasks] = useState([]);
        const [text , setText] = useState('');
        const [filter , setFilter] = useState('all');
        const [loading , setLoading] = useState(true);
        const [error , setError] = useState(null);
        const [page , setPage] = useState(1);

        useEffect(() => {
            const fetchTasks = async (url) => {
                try{
                    setLoading(true);
                    const res = await fetch(url);
                    if(!res.ok) throw new Error('Lỗi khi lấy dữ liệu');
                    const data = await res.json();
                    setTasks(data);
                }catch(err){
                    setError(err.message);
                }finally{
                    setLoading(false)
                }
            }
            fetchTasks(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=5`)

        } , [page])

        const tasksFilter = tasks.filter(task => {
            if(filter === 'completed') return task.completed === true;
            if(filter === 'waiting') return task.completed === false;
            return true;
        })

        function addTask(value){
            const newTask = {
                id : new Date().getTime(),
                title : value,
                completed : false
            };
            setTasks([...tasks , newTask]);
            setText('');
        }

        function updateChecked(id){ 
            setTasks(
                tasks.map(task => 
                    task.id === id ? {...task , completed : !task.completed} : task
                )
            )
        }

        function removeTask(id){
            setTasks(tasks.filter(val => val.id !== id))
        }

        function nextPage(page){
            setPage(page => page+=1);
        }

        function prevPage(page){
            if(page === 1) return;
            setPage(page => page-=1)
        }

        return(
            <div className={styles.container}>
                <h1>Todo List Mini</h1>
                <h2>Trang {page}</h2>

                <div className={styles.addSection}>
                    <button onClick={() => prevPage(page)}>Prev</button>
                    <button onClick={() => nextPage(page)}>Next</button>
                </div>
                
                <div className={styles.addSection}>
                    <input id='todoInput' placeholder='Nhập công việc mới...' type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    <button id='addBtn' onClick={() => addTask(text)}>Thêm</button>
                </div>

                <div className={styles.filterSection}>
                    <button onClick={() => setFilter('all')}  className={filter === 'all' ? styles.active : ''}>Tất cả</button>
                    <button onClick={() => setFilter('completed')} className={filter === 'completed' ? styles.active : ''}>Hoàn thành</button>
                    <button onClick={() => setFilter('waiting')} className={filter === 'waiting' ? styles.active : ''}>Chưa làm</button>
                </div>
                {loading && <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>}

                {error && <h2 style={{color:'red'}}>{error}</h2>}

                <ul id='todoList'>
                    {tasksFilter.length === 0 && !loading && !error && <h2 style={{color:'red'}}>Danh sách rỗng</h2> }
                    {   
                        !loading && tasksFilter.map(task =>  
                        <div className={`${styles.todoItem} ${task.completed ? styles.completed :'' }`}  key={task.id}>
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
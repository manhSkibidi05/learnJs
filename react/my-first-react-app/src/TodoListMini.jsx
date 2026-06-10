// Định nghĩa module todo list mini 

    import {useState} from 'react';

    function TodoList(){
        const [tasks , setTasks] = useState([]);
        const [text , setText] = useState('');

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

        return(
            <>
                <h2 style={{color:'green' , padding:'10px' , backgroundColor:'gray'}}>Todo List Mini</h2>
                <label htmlFor="task">Thêm task mới : </label>
                <input id='task' type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button onClick={() => addTask(text)}>Thêm</button>
                <div className='task-list'>
                    {
                        tasks.map(task =>  
                            <div className="task-card" key={task.id}>
                                <input type="checkbox" checked={task.completed} onChange={() => updateChecked(task.id)}/>
                                <span>{task.title}</span>
                                <button onClick={() => removeTask(task.id)}>Xóa</button>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    export default TodoList
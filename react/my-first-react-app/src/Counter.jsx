// định nghĩa component counter 

    import {useState} from 'react';

    function Counter(){
        const [count , setCount] = useState(0);
        return(
            <>
                <h2 style={{color : 'blue' , padding: '10px' , backgroundColor:'white'}}>Số lần đếm : {count}</h2>
                <button onClick={() => setCount(count => count + 1)}>Tăng</button>
                <button onClick={() => setCount(count => count === 0 ? count : count - 1)}>Giảm</button>
                <button onClick={() => setCount(count => count = 0)}>Làm mới</button>
            </>
        )
    }

    export default Counter;
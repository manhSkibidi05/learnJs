// định nghĩa component counter 

    import {useState , useEffect} from 'react';

    function Counter(){
        const [count , setCount] = useState(0);

        useEffect(() => {
            document.title = `Bạn đã click ${count} lần`;
        } , [count]);
        
        return(
            <>
                <h2 style={{color : 'blue' , padding: '10px' , backgroundColor:'white'}}>Số lần đếm : {count}</h2>
                <button onClick={() => setCount(count => count + 1)}>Tăng</button>
                <button onClick={() => setCount(count => count === 0 ? count : count - 1)}>Giảm</button>
                { count !== 0 ? <button onClick={() => setCount(count => count = 0)}>Làm mới</button> : ''}
            </>
        )
    }

    export default Counter;
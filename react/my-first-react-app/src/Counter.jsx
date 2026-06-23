// định nghĩa component counter 

    import {useState , useEffect} from 'react';
    import useCounter from './hooks/useCounter.js';
    import useToggle from './hooks/useToggle.js';

    function Counter(){
        const [count , step , increment , decrement , upStep , downStep , reset] = useCounter(0,1)
        const [value , toggle , setTrue , setFalse] = useToggle(true);

        return(
            <>
                <h2 style={{color : 'blue' , padding: '10px' , backgroundColor:'white'}}>Số lần đếm : {count}</h2>
                {value ? <h2 style={{color : 'blue' , padding: '10px' , backgroundColor:'white'}}>Số bước nhảy : {step}</h2> : ''}
                <button onClick={increment}>Tăng đếm</button>
                <button onClick={decrement}>Giảm đếm</button>
                <button onClick={upStep}>Tăng bước nhảy</button>
                <button onClick={downStep}>Giảm bước nhảy</button>
                <button onClick={toggle}>Ẩn bước nhảy</button>
                { count !== 0 ? <button onClick={reset}>Làm mới</button> : ''}
            </>
        )
    }

    export default Counter;
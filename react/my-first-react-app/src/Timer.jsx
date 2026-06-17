// định nghĩa component timer

    import {useState , useEffect} from 'react';

    function Timer(){
        const [totalSeconds , setTotalSeconds] = useState(0);
        const [isRunning , setIsRunning] = useState(false);

        useEffect(() => {
            let idInterval;

            if(isRunning){
                idInterval = setInterval(() => {
                    setTotalSeconds(prev => prev + 1);
                    
                } , 200);
            }
            
            return () => {
                if(idInterval) clearInterval(idInterval)
                
            }

        } , [isRunning]);

        function resetTimer(){
            setIsRunning(false);
            setTotalSeconds(0);
        }

        const hours = Math.floor(totalSeconds / 3600)
        const mins = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return(
            <>
                <button onClick={() => setIsRunning(true)} style={{padding : '10px' , borderRadius : '10px' , margin : '10px'}}>Start</button>
                <button onClick={() => setIsRunning(false)}  style={{padding : '10px' , borderRadius : '10px' , margin : '10px'}}>Stop</button>
                <button onClick={resetTimer}  style={{padding : '10px' , borderRadius : '10px' , margin : '10px'}}>Reset</button>
                <h2>{hours} : {mins} : {seconds} </h2>
            </>
        )
    }

    export default Timer
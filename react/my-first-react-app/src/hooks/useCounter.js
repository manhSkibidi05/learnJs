// định nghĩa custom hook useCounter 

    import {useState} from 'react';

    function useCounter(initialVal = 0 , initialStep = 1){
        const [count , setCount] = useState(initialVal);
        const [step , setStep] = useState(initialStep);

        const increment = () => {
            setCount(prev => prev + step)
        }

        const decrement = () => {
            setCount(prev => prev - step)
        }

        const upStep = () => {
            setStep(prev => prev + 1)
        }

        const downStep = () => {
            setStep(prev => prev - 1)
        }

        const resetCount = () => {
            setCount(0);
        }

        return [count , step , increment, decrement , upStep , downStep , resetCount]
    }

    export default useCounter;
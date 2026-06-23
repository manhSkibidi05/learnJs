// định nghĩa custom hook useLocalStorage 

    import {useState , useEffect} from 'react';

    function useLocalStorage(key , initialVal){
        const [value , setValue] = useState(() => {
            let val = localStorage.getItem(key);
            return val !== null ? JSON.parse(val) : initialVal
        })

        useEffect(() => {
            localStorage.setItem(key , JSON.stringify(value));
        },[key , value])

        const remove = () => {
            localStorage.removeItem(key);
            setValue(initialVal)
        }

        return [value , setValue , remove]
    }

    export default useLocalStorage
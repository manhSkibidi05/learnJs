// định nghĩa custom hook useDebounce 

    import {useState , useEffect} from 'react';

    function useDebounce(inputValue , delay = 500){
        const [value , setValue] = useState(inputValue);

        useEffect(() => {
            let idTimeout = setTimeout(() => {
                setValue(inputValue)
            }, delay)

            return () => {
                if(idTimeout) clearTimeout(idTimeout)
            }
        } , [inputValue , delay])

        return value
    }

    export default useDebounce
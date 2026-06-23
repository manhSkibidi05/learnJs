// định nghĩa custom hook useDebounce 

    import {useState , useEffect} from 'react';

    function useDebounce(inputValue , delay = 500){
        const [value , setValue] = useState(inputValue);
        const [loading , setLoading] = useState(true);

        useEffect(() => {
            setLoading(true);
            let idTimeout = setTimeout(() => {
                setValue(inputValue);
                setLoading(false)
            }, delay)

            return () => {
                if(idTimeout) clearTimeout(idTimeout)
            }
        } , [inputValue , delay])

        return [value , loading]
    }

    export default useDebounce;
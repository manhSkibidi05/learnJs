// định nghĩa custom hook useToggle 

    import {useState} from 'react';

    function useToggle(initialVal){
        const [trangThai , setTrangThai] = useState(initialVal);

        const toggle = () => {
            setTrangThai(prev => !prev);
        }

        const setTrue = () => {
            setTrangThai(true)
        }

        const setFalse = () => {
            setTrangThai(false)
        }

        return [trangThai , toggle , setTrue , setFalse]
    }

    export default useToggle
// Component theme toggle 

    import {useState , useEffect} from 'react';
    import useLocalStorage from './hooks/useLocalStorage.js'

    function ThemeToggle(){
        const [theme , setTheme , removeTheme] = useLocalStorage('theme' , 'dark');

        return (
            <>
                <h1>Trạng thái theme bây giờ là : {theme} </h1>
                <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}>Thay đổi trạng thái </button>
                <button onClick={removeTheme}>Xóa trạng thái hiện tại</button>
            </>
        )
    }

    export default ThemeToggle

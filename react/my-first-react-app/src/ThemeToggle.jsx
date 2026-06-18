// Component theme toggle 

    import {useState , useEffect} from 'react';

    function ThemeToggle(){
        const [theme , setTheme] = useState('');

        useEffect(() => {
            if(!theme) return;
            localStorage.setItem('themeLocal' , theme);

        }, [theme]);

        useEffect(() => {
            setTheme(localStorage.getItem('themeLocal'))
        }, []);

        return <button onClick={() =>setTheme(val => val === 'light' ? 'dark' : 'light')}>Thay đổi theme</button>
    }

    export default ThemeToggle

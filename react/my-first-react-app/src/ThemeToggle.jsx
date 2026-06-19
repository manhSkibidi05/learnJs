// Component theme toggle 

    import {useState , useEffect} from 'react';

    function ThemeToggle(){
        const [theme , setTheme] = useState(() => {
            return localStorage.getItem('themeLocal') || 'light';
        });

        useEffect(() => {
            if(!theme) return;
            localStorage.setItem('themeLocal' , theme);

        }, [theme]);

        return <button onClick={() =>setTheme(val => val === 'light' ? 'dark' : 'light')}>Thay đổi theme</button>
    }

    export default ThemeToggle

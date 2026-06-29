// Định nghĩa component Header
    
    import { NavLink } from 'react-router-dom';
    import styles from './Header.module.css';

    function Header(){
        return (
            <header className={styles.header}> 
                <nav>
                    <NavLink to='/' end className={({isActive}) => isActive ? styles.active : ''}>
                        Trang chủ
                    </NavLink>
                    <NavLink to='register'  className={({isActive}) => isActive ? styles.active : ''}>
                        Đăng kí
                    </NavLink>
                    <NavLink to='products'  className={({isActive}) => isActive ? styles.active : ''}>
                        Sản phẩm
                    </NavLink>
                </nav>
            </header>
        );
    }

    export default Header;
// Định nghĩa component Layout -> nơi sử dụng <Outlet /> để render nội dung các trang con 

    import {Outlet} from 'react-router-dom';
    import Header from './Header';
    import Footer from './Footer';

    function Layout(){
        return(
            <>
                <Header></Header>
                <main>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </>
        )
    }

    export default Layout;
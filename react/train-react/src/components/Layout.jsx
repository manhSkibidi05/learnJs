// Định nghĩa component Layout -> nơi sử dụng <Outlet /> để render nội dung các trang con 

    import {Outlet} from 'react-router-dom';
    import Header from './Header';
    import Footer from './Footer';

    // component Layout chứa Header và Footer 2 component mặc định làm layout và chỉ thay đổi phần tử Outlet dựa vào đường dẫn
    // -> Layout sẽ được Route cha gắn còn các Route bên trong nó sẽ render bên trong Outlet của Layout
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
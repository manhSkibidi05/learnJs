// Ngày 6 : React Router DOM - Điều hướng trong ứng dụng React 

    // - Hôm nay chúng ta học 1 trong những thư viện quan trọng nhất khi xây dựng ứng dụng react đa trang : React Router DOM
    // -> Nó giúp bạn điều hướng giữa các trang component mà không cần tải lại toàn bộ trang , tạo cảm giác như 1 ứng dụng thực thụ

    // - Mục tiêu : 
        // + Cài đặt và cấu hình React Router DOM 
        // + Hiểu các thành phần cơ bản : BrowerRouter , Routes , Route , Link , NavLink
        // + Tạo các route tĩnh và route động với useParams
        // + Điều hướng lập trình với useNavigate
        // + Bảo vệ route (Private Route) - yêu cầu đăng nhập 
        // + Lazy loading routes để tối ưu hiệu năng 

    // 1. Giới thiệu React Router DOM 
        // - React Router DOM là thư viện điều hướng phổ biến nhất cho React . Nó cho phép bạn ánh xạ URL với các component
        // -> giúp người dùng điều hướng giữa các "trang" trong 1 ứng dụng mà không cần reload lại 

        // - Cài đặt : npm install react-router-dom

        // - Các thành phần chính : 
            // + BrowerRouter : Bọc toàn bộ ứng dụng , quản lý lịch sử trình duyệt
            // + Routes : Nơi chứa định nghĩa route 
            // + Route : Ánh xạ đường dẫn (path) với component 
            // + Link : Thẻ điều hướng (thay cho thẻ <a>)
            // + NavLink : Giống Link nhưng có thể thêm style active 

    // 2. Cấu hình cơ bản 
        // Bước 1 : Bọc ứng dụng với BrowerRouter 
        // -> Nằm trong file main.js 

        import React from 'react';
        import ReactDOM from 'react-dom/client';
        import {BrowserRouter} from 'react-router-dom';
        import App from './App';

        ReactDOM.createRoot(document.getElementById('root')).render(
            <BrowserRouter>
                <App></App>
            </BrowserRouter>
        );

        // Bước 2 : Định nghĩa các route 
        // -> Nằm trong file app.js 

        import {Routes , Route , Link} from 'react-routes-dom';
        import Home from './pages/Home';
        import About from './pages/About';
        import Contact from './pages/Contact';

        function App(){
            return (
                <div>
                    <nav>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                        <Link to='/contact'>Contact</Link>
                    </nav>

                    <Routes>
                        <Route path='/' element={<Home/>}></Route> 
                        <Route path='/about' element={<About/>}></Route>
                        <Route path='/contact' element={<Contact/>}></Route>
                    </Routes>
                </div>
            );
        }

        export default App;

    // 3. NavLink -> là Link nhưng có style active 

        import {NavLink} from 'react-router-dom';

        <NavLink 
            to='/about'
            className={({isActive}) => (isActive ? 'active-link' : '')}
        >
            About
        </NavLink>;

    // 4. Route động (dynamic routes) với useParams
    // -> Khi bạn cần truyền tham số trên url (/product/123) , dùng route động 

        // - định nghĩa route : 
        <Route path="/product/:id" element={<ProductDetail/>}></Route>;

        // - trong component ProductDetail 
        import { useParams } from 'react-router-dom';

        function ProductDetail(){
            const {id} = useParams();
            return <h2>Chi tiết sản phẩm {id} </h2>
        };

    // 5. Điều hướng lập trình với useNagivate 
    // -> Khi bạn muốn điều hướng sau một hành động (vd : submit form , đăng nhập thành công)

        import { useNagivate } from 'react-router-dom';

        function Login(){
            const navigate = useNagivate();

            const handlerLogin = () => {
                // ... xác thực 
                navigate('/dashboard') // chuyển đến dashboard
            };

            return <button onClick={handleLogin}>Đăng nhập</button>
        }
    // - Các tùy chọn : navigate(url) -> đi đến url , navigate(-1) -> quay lại trang trước , navigate(1) -> đi tiếp 

    // 6. Nested Routes (route lồng nhau)
    // -> Khi 1 trang có layout chung (header , sidebar) và nội dung thay đổi bên trong 

        // - trong file App.jsx
        <Route path='/dashboard' element={<DashboardLayout/>}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
        </Route>

        // - trong file DashboardLayout.jsx 

        import { Outlet, Link } from 'react-router-dom';

        function DashboardLayout() {
            return (
                <div>
                <nav>
                    <Link to="/dashboard">Home</Link>
                    <Link to="/dashboard/profile">Profile</Link>
                    <Link to="/dashboard/settings">Settings</Link>
                </nav>
                <Outlet /> {/* Nơi các component con được render */}
                </div>
            );
        }

    // 7. Bảo vệ route (Private Route)
    // -> Khi người dùng đã đăng nhập mới có thể truy cập được component này , cần tạo component wrapper 
        
        // - trong file components/PrivateRoute.jsx 

        import {useNavigate} from 'react-router-dom';

        function PrivateRoute({children}){
            const isAuthenticated = localStorage.getItem('token'); // hoặc lấy từ context
            return isAuthenticated ? children : <Navigate to='/login' replace></Navigate>
        }

        // - sử dụng 
        <Route path='/dashboard' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>

    // 8. Lazy Loading Routes (tối ưu hiệu năng)
    // -> Dùng React.lazy và Suspense để chỉ tải component khi cần thiết 

        import {lazy , Suspense} from 'react';
        const Home = lazy(() => import('./pages/Home'));
        const About = lazy(() => import('./pages/About'));

        // Trong Routes 
        <Route path='/' element={
            <Suspense fallBack={<div>Đang tải...</div>}>
                <Home/>
            </Suspense>
        }>
        </Route>;

    // 9. useLocation -> lấy thông tin URL hiện tại 

        import {useLocation} from 'react-router-dom';

        function CurrentPage(){
            const location = useLocation();

            console.log(location.pathname) // chứa tên đường dẫn -> /about
            console.log(location.search) // chứa query string -> ?q=hello
            console.log(location.hash) // -> #section1

            return <p>Đang ở : {location.pathname}</p>;
        }
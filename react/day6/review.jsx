// Review ngày 6 : 

    // - React router dom : là một thư viện cung cấp các component và các hook để giúp việc tổ chức ứng dụng 
    // theo hướng sigle page application (ứng dụng 1 trang duy nhất )
    // -> sigle page application hướng tới việc 1 ứng dụng chỉ sử dụng 1 trang duy nhất việc điều hướng sang các
    // trang khác chỉ là thay đổi các component khác và không làm tải lại trang 
    
// - Bổ sung kiến thức nâng cao : 

    // 1. Các thành phần chính của React Router DOM 
        // + BrowerRouter : component bọc toàn bộ ứng dụng để kích hoạt routing 
        // + Routes : component chứa các route (thay thế cho switch) 
        // + Route : định nghĩa 1 đường dẫn và component sẽ được render khi url khớp 
        // + Link và NavLink : component tạo liên kết điều hướng không tải lại trang 
        // + Outlet : dùng cho Route lồng nhau là nơi các component con được render 
        // + useNavigate : hook điều hướng lập trình (sau khi submit form) 
        // + useParams : lấy tham số từ url 
        // + useLocation : lấy đối tượng location hiện tại , có thể dùng để đọc query string hoặc state 
        // + useMatch : kiểm tra xem url hiện tại có khớp với một pattern nào không 

    // 2. Cách React Router hoạt động trong SPA 
        // - Khi người dùng click vào <Link> hoặc gọi navigate() , React Router sẽ 
            // 1. Ngăn chặn hành vi tải trang mặc định của trình duyệt 
            // 2. Cập nhật url trong thanh địa chỉ 
            // 3. So khớp url với các route đã định nghĩa 
            // 4. Render component tương ứng - không refresh trang 

    // -> có thể hiểu rằng luồng hoạt động của react router dom như sau 
        // + component BrowerRouter bọc lại toàn bộ ứng dụng lúc này các đường dẫn khi xảy ra sẽ đều bị ngăn chăn việc tải lại trang mà được điều hướng tới routes
        // + component Routes là nơi định nghĩa các Route đường dẫn đi qua và đến các Route 
        // + component Route là điểm dừng của đường dẫn bằng cách so khớp đường dẫn nó sẽ chạy component được định nghĩa trong route
        // + component Link và NavLink chứa đường dẫn và điều hướng sang routes , có thể điều hướng bằng component Link/NavLink hoặc hook useNavigate

// - Bổ sung các kỹ thuật nâng cao :
    
    // 1. Nested Routes (route lồng nhau) 
        // - Khái niệm : Cho phép một route cha bao bọc các route con , giúp code tổ chức UI theo cấu trúc phân cấp .
        // Thay vì mỗi route render toàn bộ trang , route cha chỉ render một layout và phần nội dung thay đổi là các route con

        // - Cách hoạt động : 
            // + Route cha định nghĩa một component có chứa <Outlet />
            // + <Outlet /> là placeholder , nơi react router sẽ render component của route con khớp với URL hiện tại 
            // + Route con được định nghĩa bên trong Route cha 
    
        // vd : component Layout -> dành cho Route cha 

        import {BrowerRouter , Routes , Route , Outlet , Link} from 'react-route-dom';

        function Layout(){
            return (
                <div>
                    <header>Header chung</header>
                    <nav>
                        <Link to='/'>HOME</Link>
                        <Link to='/about'>ABOUT</Link>
                        <Link to='/users'>USERS</Link>
                    </nav>
                    <main>
                        <Outlet></Outlet> {/* nội dung của route con sẽ được render ở đây */}
                    </main>
                    <footer>
                        Footer chung
                    </footer>
                </div>
            )
        }

        // vd : component App -> component chính định nghĩa routes điều hướng để render các component 

        function App(){
            return (
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}></Route>
                        <Route path='about' element={<About/>}></Route>
                        <Route path='users' element={<Users />}></Route>
                    </Route>
                </Routes>
            )
        }

        // - Lợi ích : 
            // + Duy trì UI chung (header , sidebar , footer) không bị render lại khi chuyển route con
            // + Dễ dàng chia sẻ context hoặc state giữa layout và các route con -> dùng useOutletContext 

    // 2. Protected Routes (route yêu cần xác thực)
        // - Khái niệm : Một số route chỉ cho phép truy cập khi người dùng đã đăng nhập hoặc có quyền nhất
        // định , nếu chưa đáp ứng điều kiện sẽ chuyển hướng về trang login hoặc trang lỗi 

        // -> cách triển khai thông dụng dùng component wrapper hoặc element 

        // vd : useAuth -> định nghĩa custom hook kiểm tra trạng thái đã đăng nhập hay chưa 

        function useAuth(){
            const user = useContext(AuthContext);
            return user ? user : null;
        }

        // vd : ProtectedRoute -> route cần xác thực thông tin trước khi chạy route con bên trong 

        import {Navigate , Outlet} from 'react-router-dom';

        function ProtectedRoute({ children }){
            const user = useAuth();
            if(!user){
                return <Navigate to='login' replace />
            }

            return children ? children : <Outlet />;
        }

        // - Lưu ý : 
            // + Dùng replace trong <Navigate /> để thay thế trang hiện tại trong lịch sử tránh người dùng bấm
            // back quay lại trang cần bảo vệ 
            // + Có thể kết hợp với role-based để kiểm soát quyền truy cập 
            // + Nên kết hợp với context hoặc store (redux , zustand) để quản lí trạng thái auth toàn cục 
        
        // - Các trường hợp xảy ra đối với ProtectedRoute 
            // + Khi component bảo vệ sử dụng như lớp nền cho componet con bên trong 
            <ProtectedRoute>
                <App />  
            </ProtectedRoute>;
            // -> lúc này children là app phải trải qua xác thực thì mới chạy vào component app 

            // + Khi component không có component con mà được sử dụng là route cha chứa các route con 
            <Route path='/admin' element={ <ProtectedRoute/> }>
                <Route path='users' element={ <Users/>}/>
                <Route path='setting' element={ <Setting/>}/>
            </Route> 
            // -> lúc này ProtectedRoute không có children nên trả về Outlet 

        // - Outlet là component đặc biệt react router , nó hoạt động như một placeholder nơi mà route con
        // khớp với URL hiện tại sẽ được render 

// Review ngày 6 (tiếp) :

    // - react router dom : mục đích của sử dụng thư viện này là xây dựng ứng dụng web theo hướng single page application
    // -> single page application là : ứng dụng web chỉ có 1 trang duy nhất và sẽ được điều hướng thông qua các đường
    // dẫn sẽ dẫn đến các route và cập nhật giao diện bằng cách loại bỏ component cũ thêm component mới phù hợp với
    // đường dẫn 

    // -> react route dom cung cấp các component và hook có sẵn để thực hiện việc xây dựng ứng dụng spa 

        // + BrowserRouter : component sử dụng để bọc toàn bộ ứng dụng -> giúp ngăn chặn hành vi reload khi click 
        // vào đường dẫn và điều hướng đến Routes 

        // + Routes : component sử dụng để bọc các Route -> giúp nhận đường dẫn và khớp với Route 

        // + Route : component sử dụng là điểm dừng của đường dẫn -> định nghĩa các Route thêm các thuộc tính 
        // path=url : đường dẫn , element=componet : component sẽ gắn vào dom nếu đúng đường dẫn 

        // + Link/NavLink : component sử dụng để điều hướng bằng cách thay đổi đường dẫn hiện tại nhưng không re-load

        // + Outlet : component sử dụng khi cần route lồng nhau -> đặt Outlet trong Route cha thì khi Route con render sẽ là vị trí mà Outlet được đặt trước đó

        // + useParams : lấy giá trị động trên url

    // -> các kĩ thuật thường được áp dụng 

        // + route lồng nhau : sử dụng khi giao diện chỉ thay đổi 1 phần còn các phần xung quanh giữ nguyên 
        // -> cần định nghĩa component với phần giao diện giữ nguyên và thêm Outlet vào phần giao diện thay đổi
        // -> khi định nghĩa Route lồng thêm Route con bên trong 
    
        // + bảo mật route : sử dụng khi cần xác thực xem đã đủ quyền để truy cập vào Route này hay không
        // -> cần bọc component cần bảo vệ bởi 1 component xác thực bên ngoài 
        // -> khi mà xác thực thành công render component được bảo vệ , nếu thất bại chuyển hướng về trang đăng nhập/home...
        

// - Review ngày 6 (cuối) : 

    // - react router dom là : thư viện cung cấp các component và hook để định nghĩa ứng dụng theo hướng 
    // SPA - single page application 
    // -> SPA : là ứng dụng mà chỉ dùng 1 trang duy nhất và thay đổi dựa trên đường dẫn không re-load trang
    // mà nó sẽ render lại trang dựa trên đường dẫn mới Routes sẽ render lại và mount Route phù hợp với 
    // đường dẫn mới unmout Route cũ 

    

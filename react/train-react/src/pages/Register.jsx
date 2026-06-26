// Định nghĩa component mô tả tiến trình đăng kí tài khoản 

    import {Outlet , useNavigate , useLocation , Navigate} from 'react-router-dom';
    import {useState} from 'react';

    function Register(){
        const [email , setEmail] = useState('');
        const [password , setPassword] = useState('');
        const [name , setName] = useState('');
        const [age , setAge] =  useState(0);
        const location = useLocation();
        const nagivate = useNavigate();

        if(location.pathname === '/register/step2'){
            if(email === '' || password === ''){
                return <Navigate  to='/register/step1' />
            } 
        }

        if(location.pathname === '/register/step3'){
            if(email === '' || password === ''){
                return <Navigate  to='/register/step1' />
            }
            if(name === '' || age === 0){
                return <Navigate  to='/register/step2' />
            } 
        }

        if(location.pathname === '/register/success'){
            if(email === '' || password === '' || name === '' || age === 0){
                return <Navigate  to='/register' />
            }
        }

        const check = () => {
            
            if(location.pathname === '/register') return '/register/step1'
            if(location.pathname === '/register/step1') return '/register/step2';
            if(location.pathname === '/register/step2') return '/register/step3';
            if(location.pathname === '/register/step3') return '/register/success';
            return '/register'
        }

        return(
            <div>
                <h2>Tiến trình hiện tại</h2>
                <h3>{email &&  password && name && age ? 'Bạn đã đăng kí' : 'Bạn chưa đăng kí'}</h3>
                <div>
                    <Outlet context={{email , setEmail , password , setPassword , name , setName , age , setAge}}></Outlet>
                </div>

                <button onClick={() => nagivate(check())}>Bước sau</button>
            </div>
        )
    }

    export default Register;
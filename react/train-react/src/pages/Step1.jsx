// định nghĩa component register bước 1 

    import { useOutletContext } from "react-router-dom";

    function Step1(){
        const {setEmail , setPassword , email , password} = useOutletContext()

        return(
            <>
                <h3>Bước 1</h3>
                <label htmlFor="email">Nhập email</label>
                <input type="text" name="email" value={email}  onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Nhập mật khẩu</label>
                <input type="password" name="password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                {(!email || !password) ? <p style={{color : 'red'}}>Hãy nhập dữ liệu !!</p> :''}
            </>
        )
    }

    export default Step1
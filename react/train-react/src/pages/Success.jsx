// định nghĩa component register bước 3

    import { useOutletContext  } from "react-router-dom";

    function Success(){
        const {name , age , email , password} = useOutletContext();

        return(
            <>
                <h3>Đăng kí thành công</h3>
                <p>Email : {email}</p>
                <p>Mật khẩu : {password}</p>
                <p>Tên là : {name}</p>
                <p>Tuổi là : {age}</p>
            </>
        )
    }

    export default Success;
// định nghĩa component register bước 3

    import { useOutletContext } from "react-router-dom";

    function Step3(){
        const {name , age , email , password} = useOutletContext()

        return(
            <>
                <h3>Bước 3</h3>
                <p>Email : {email}</p>
                <p>Mật khẩu : {password}</p>
                <p>Tên là : {name}</p>
                <p>Tuổi là : {age}</p>
            </>
        )
    }

    export default Step3
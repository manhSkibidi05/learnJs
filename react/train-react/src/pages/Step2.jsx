// định nghĩa component register bước 2

    import { useOutletContext } from "react-router-dom";

    function Step2(){
        const {setName , setAge} = useOutletContext()

        return(
            <>
                <h3>Bước 2</h3>
                <label htmlFor="name">Nhập Tên</label>
                <input type="text" name="name"  onChange={(e) => setName(e.target.value)} />
                <label htmlFor="age">Nhập tuổi</label>
                <input type="number" name="age"  onChange={(e) => setAge(e.target.value)}/>
            </>
        )
    }

    export default Step2
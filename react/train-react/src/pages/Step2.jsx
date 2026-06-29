// định nghĩa component register bước 2

    import { useOutletContext } from "react-router-dom";

    function Step2(){
        const {setName , setAge , name , age} = useOutletContext()

        return(
            <>
                <h3>Bước 2</h3>
                <label htmlFor="name">Nhập Tên</label>
                <input type="text" name="name" value={name}  onChange={(e) => setName(e.target.value)} />
                <label htmlFor="age">Nhập tuổi</label>
                <input type="number" name="age" value={age} onChange={(e) => setAge(e.target.value)}/>
                {(!name || !age) ? <p style={{color : 'red'}}>Hãy nhập dữ liệu !!</p> :''}
            </>
        )
    }

    export default Step2
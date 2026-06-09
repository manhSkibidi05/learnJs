// Định nghĩa component form sinh viên 

    import {useState} from 'react';

    function StudentForm(){
        const [name , setName] = useState('');
        const [age , setAge] = useState(0);
        const [gender , setGender] = useState('Nam');
        const [hobby , setHobby] = useState('Đọc sách');
        const [city , setCity] = useState('Hà Nội');

        return(
            <form >
                <label htmlFor="name">Tên bạn : </label>
                <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="age">Tuổi bạn : </label>
                <input type="number" id='age' value={age} onChange={(e) => setAge(e.target.value)} />
                <br />
                <input type="radio"  id="nam" name='gender' value='Nam' checked={gender === 'Nam' ? true : false} onChange={(e) => setGender(e.target.cheked ? 'Nam' : 'Nữ')}/> <label htmlFor="nam">Nam</label>
                <input type="radio"  id="nu" name='gender' value='Nữ' checked={gender === 'Nữ' ? true : false} onChange={(e) => setGender(e.target.cheked ? 'Nữ' : 'Nam')}/> <label htmlFor="nu">Nữ</label>
            </form>
        )
    }

    export default StudentForm;
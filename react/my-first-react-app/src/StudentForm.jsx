// Định nghĩa component form sinh viên 

    import {useState} from 'react';

    function StudentForm(){
        const [name , setName] = useState('');
        const [age , setAge] = useState(0);
        const [gender , setGender] = useState('Nam');
        const [hobby , setHobby] = useState([]);
        const [city , setCity] = useState('Hà Nội');

        function checkedInput(value){
            let pos = hobby.findIndex(val => val === value);
            if(pos === -1 ){
                setHobby(hobby => [...hobby,value])
            }else{
                setHobby(hobby => hobby.filter(val => val !== value))
            }
        }

        return(
            <form onSubmit={ (e) => {e.preventDefault() ; console.log({name , age , gender , hobby , city}) }}>
                <label htmlFor="name">Tên bạn : </label>
                <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <label htmlFor="age">Tuổi bạn : </label>
                <input type="number" id='age' value={age} onChange={(e) => setAge(e.target.value)} />
                <br />
                <label htmlFor="">Giới tính : </label>
                <input type="radio"  id="nam" name='gender' value='Nam' checked={gender === 'Nam'}  onChange={(e) => setGender('Nam')}/>
                <label htmlFor="nam">Nam</label>
                <input type="radio"  id="nu" name='gender' value='Nữ' checked={gender === 'Nữ'} onChange={(e) => setGender('Nữ')}/>
                <label htmlFor="nu">Nữ</label>
                <br />
                <label htmlFor="hobby">Sở thích : </label>
                Đọc sách <input type="checkbox" value='Đọc sách' checked={hobby.includes('Đọc sách')} onChange={(e) => checkedInput(e.target.value)} />
                Chơi game<input type="checkbox" value='Chơi game' checked={hobby.includes('Chơi game')} onChange={(e) => checkedInput(e.target.value)}/>
                Đi chơi <input type="checkbox" value='Đi chơi' checked={hobby.includes('Đi chơi')} onChange={(e) => checkedInput(e.target.value)}/>
                <br />
                <label htmlFor="city">Thành phố</label>
                <select id='city' value={city} onChange={(e) => setCity(e.target.value)} >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                </select>
                <button type="submit">Gửi form</button>
            </form>
        )
    }

    export default StudentForm;
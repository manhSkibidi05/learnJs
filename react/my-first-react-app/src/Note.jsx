// Định nghĩa component Note 

    import {useState} from 'react';

    function Note(){
        const [notes , setNotes] = useState([]);
        const [text , setText] = useState('');

        return(
            <>
                <label htmlFor="note">Thêm ghi chú mới</label>
                <input type="text" id='note' value={text} onChange={(e) => setText(e.target.value)}/>
                <button onClick={() => setNotes([...notes , {id : new Date().getTime() , text}])}>Thêm</button>
                <ul>
                    {notes.map(value => 
                    <li key={value.id}>
                        <span>{value.text}</span>
                        <button onClick={() => setNotes(notes.filter(val => val.id !== value.id))}>Xóa</button> 
                    </li>)
                    }
                </ul>
            </>
        )
    }
    export default Note;

// - Trong file .jsx có 2 vùng rõ rệt : 

    // 1. Vùng JavaScript thuần 
    // - Nằm ngoài các thẻ HTML-like (các phần tử jsx viết giống html)
    // - Có thể viết bất cứ câu lệnh JS nào : khai báo biến , hàm , vòng lặp , điều kiện , import...
    // - Viết mã js không cần dấu {}

    // vd : 
    function test(){
        // vùng js thuần 
        const a = 2;
        const arr = [1,2,4];
        if(a > 2) console.log(arr)
        
        // bắt đầu vùng jsx
        return(
            <div>
                <h1 className='container'>Alo</h1>
                <p>Name : {name}</p>
                <span style={{color : 'red'}}>Kĩ năng</span>
            </div>
        )
    }

    // 2. Vùng JSX (cú pháp HTML-like)
    // - Nằm trong return (...) hoặc bất kì đâu có thẻ <...> giống html
    // - Nếu muốn viết mã js trong vùng này cần dấu {}
    // - Không dùng dấu {} khi viết chuỗi tĩnh hoặc thuộc tính tĩnh 

    // vd : ở trên

    // -> Cặp dấu ngoặc nhọn {} có thể nhúng các loại biểu thức js nào ở trong vùng JSX : 
    // + một số , chuỗi , mảng , obj 
    // + một phần tử JSX (vd : <h1>...</h1>)
    // + một mảng chứa các phần tử JSX 
    
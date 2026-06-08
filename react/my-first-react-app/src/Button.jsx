// Định nghĩa component Button :
    // + Button nhận props label và onclick 
    // + Khi click nút , gọi onClick và hiện thị 'button clicked'

    function Button({label , func}){
        return <button onClick={func} >{label}</button>
        
    }
    export default Button

    
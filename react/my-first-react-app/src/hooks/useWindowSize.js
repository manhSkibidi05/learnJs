// định nghĩa custom hook useWindowSize 

    import {useState , useEffect} from 'react';

    function useWindowSize(){
        // khởi tạo state với kích thước hiện tại của cửa sổ (nếu có window)
        const [windowSize , setWindowSize] = useState({
            width : window.innerWidth,
            height : window.innerHeight
        });

        useEffect(() => {
            // hàm xử lí sự kiện re-size 
            const handleResize = () => {
                setWindowSize({
                    width : window.innerWidth,
                    height : window.innerHeight
                })
            }

            // đăng ký lắng nghe sự kiện resize trên window
            window.addEventListener('resize' , handleResize);

            return () => {
                window.removeEventListener('resize' , handleResize)
            }
        } , []);

        return windowSize;
    }

    export default useWindowSize 
    
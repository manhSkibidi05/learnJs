// component hiện thị kích thước của màn hình window

    import useWindowSize from './hooks/useWindowSize.js';

    function ShowWindowSize(){
        const {width , height} = useWindowSize();

        return (
            <>
                <h2>Cửa sổ window có kích thước sau : </h2>
                <h3>Chiều rộng : {width} px</h3>
                <h3>Chiều cao : {height} px</h3>
            </>
        )
    }

    export default ShowWindowSize
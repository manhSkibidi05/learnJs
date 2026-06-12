// Định nghĩa component data fetcher 

    import {useState} from 'react';

    function DataFetcher(){
        const [isLoading , setLoading] = useState(true);
        setTimeout(() => {
            setLoading(false)
        },3000)

        return(
            <>
                <h2>Đang chờ lấy dữ liệu</h2>
                {
                    isLoading ? (
                        <button disabled>Đang chờ...</button>
                    ) :
                    (
                        <button >Lấy dữ liệu</button>
                    )
                }
                
            </>
        )
    }

    export default DataFetcher
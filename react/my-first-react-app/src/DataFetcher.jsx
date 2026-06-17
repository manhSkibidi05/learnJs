// Định nghĩa component data fetcher 

    import {useState , useEffect} from 'react';

    function DataFetcher(){
        const [isLoading , setLoading] = useState(true);

        useEffect(() => {
            let idTimeout = setTimeout(() => {
                isLoading = false
            },2000)
            return () => {
                clearTimeout(id)
            }
        }, [])

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
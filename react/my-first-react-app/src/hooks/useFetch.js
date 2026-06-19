// định nghĩa custom hook useFetch 

    import {useState , useEffect} from 'react';

    function useFetch(url){
        const [data , setData] = useState(null);
        const [loading , setLoading] = useState(true);
        const [error , setErr] = useState(null);
    
        useEffect(() => {
            async function fetchUrl(){
                try{
                    setLoading(true);
                    setErr(null);
                    const res = await fetch(url);
                    if(!res.ok) throw new Error('Lỗi khi tải dữ liệu');
                    const val = await res.json();
                    setData(val);
                }catch(err){
                    setErr(err.message)
                }finally{
                    setLoading(false)
                }
            }
            
            fetchUrl();
            
        } , [url])

        return {data , loading , error}
    }

    export default useFetch
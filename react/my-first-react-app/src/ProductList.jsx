// Tạo component product list 

    // import 2 hàm của react để sử dụng 
    // useState cho phép tạo biến state component hiện thị hoàn toàn dựa vào state , state chỉ thay đổi qua hàm setState sẽ nhận giá trị mới và re-render component
    import {useState , useEffect} from 'react';
    // import đối tượng styles của module.css để sử dụng style thông qua class , gọi các class như thuộc tính của styles 
    import styles from './ProductList.module.css';

    function ProductList(){
        // khởi tạo state product lưu trữ danh sách sản phẩm
        const [products , setProducts] = useState([]);
        // khởi tạo state keyword lưu trữ từ khóa giúp tìm sản phẩm
        const [keyword , setKeyword] = useState('');
        // khởi tạo state loading lưu trữ trạng thái component khi chưa lấy dữ liệu thành công sẽ trả về component ở trạng thái loading 
        const [loading , setLoading] = useState(true);
        // khởi tạo state error lưu trữ trạng thái component khi lấy dữ liệu thất bại sẽ trả về component ở trạng thái thất bại
        const [error , setError] = useState(null);
        
        // hàm bất đồng bộ lấy dữ liệu api
        async function fetchData(url){
            try{
                // đặt component loading
                setLoading(true);    
                // xử lí bất đồng bộ 
                const res = await fetch(url);
                if(!res.ok) throw new Error('Lỗi tải sản phẩm');
                const data = await res.json();
                // lấy dữ liệu thành công chuyển cho setProducts re-render lại component
                setProducts(data);
            }catch(err){
                // nếu gặp lỗi khi lấy dữ liệu -> đặt component error
                setError(err.message);
            }finally{
                // kể cả khi lỗi hay không lỗi vẫn thực hiện -> xóa component loading 
                setLoading(false);
            }
        }

        useEffect(() => {
            fetchData('https://fakestoreapi.com/products');
        } , []);
        
        // lọc dữ liệu dựa trên từ khóa nếu không có trả về mảng thường , nếu có trả về mảng lọc theo tên  sản phẩm
        const productsFilter = keyword.trim() 
        ? products.filter(prd => prd.title.toLowerCase().includes(keyword.trim().toLowerCase())) 
        : products;

        // trường hợp loading true -> component ở trạng thái loading trả về jsx khi ở trạng thái này
        if(loading) return <div>Đang tải sản phẩm...</div>;
        // trường hợp có lỗi -> component ở trạng thái error trả về jsx khi ở trạng thái này 
        if(error) return <div>Lỗi : {error}</div>

        // trường hợp khi loading false và không lỗi -> component trả về jsx chứa danh sách sản phẩm 
        return(
            <>
            <div className={styles.searchBox}>
                <input type="text" id="searchInput" placeholder='Tìm kiếm sản phẩm...' onChange={(e) => setKeyword(e.target.value)}/>
            </div>
            <div className={styles.container}>
                {
                productsFilter.length === 0 ? 
                (<h2>Không có sản phẩm nào</h2>) :
                (productsFilter.map(
                    prd => 
                    <div className={styles.productCard} key={prd?.id}>
                        <div className={styles.imageWrapper}>
                            <img className={styles.cardImage} src={prd?.image} alt={prd?.title}/>
                        </div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.productTitle}>{prd?.title}</span>
                                <span className={styles.productCategory}>{prd?.category}</span>
                            </div>
                            <div className={styles.productPrice}>$ {prd?.price}</div>
                            <div className={styles.productDescription}>
                                {prd?.description}
                            </div>
                            <div className={styles.cardAction}>
                                <button className={styles.btnBuy}>Xem chi tiết → </button>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
            </>
        )
        
    }
    export default ProductList

    
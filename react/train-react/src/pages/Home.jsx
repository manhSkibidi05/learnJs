// Định nghĩa component Home -> render giao diện Home (chính) của web 

    import {Link , replace, useSearchParams} from 'react-router-dom';
    import blogPost from '../data/blogPosts';
    import styles from './Home.module.css';

    // component home -> chứa danh sách bài viết và thanh tìm kiếm lọc theo từ khóa 
    function Home(){
        // hook useSearchParams nhận giá trị mặc định đối tượng rỗng
        // -> searchParams là đối tượng chứa key value , setSearch thay đổi giá trị của searchParams
        const [searchParams , setSearch] = useSearchParams({} , {replace : true});

        // lấy giá trị key title ở trong đối tượng này
        const title = searchParams.get('title');
        
        // lọc giá trị dựa trên title
        const filtered = title ? blogPost.filter(val => val.title.toLowerCase().includes(title.toLowerCase()))  
        : blogPost;

        return(
            <div>
                <h1>Danh sách bài viết mới nhất</h1>
                <input type="text" value={title || ''} onChange={(e) => setSearch({title : e.target.value})} />
                <button onClick={() => setSearch({})}>Xóa bộ lọc</button>

                {/* Luồng hoạt động là người dùng nhập dữ liệu vào input dữ liệu lưu vào state keyword - dựa vào đó lọc dữ liệu cần in ra */}

                <div>
                    {filtered.length === 0 ? <h2>Không có blog phù hợp...</h2> : 
                    filtered.map(post => 
                        <div key={post.id} className={styles.card}>
                            <h2>Tiêu đề : {post.title}</h2>
                            <p>Nội dung : {post.excerpt}</p>
                            <p>Tác giả : {post.author}</p>
                            <Link to={`/blog/${post.id}`}>Xem thêm</Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    export default Home;
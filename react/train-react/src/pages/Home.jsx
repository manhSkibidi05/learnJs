// Định nghĩa component Home -> render giao diện Home (chính) của web 

    import {Link , useSearchParams} from 'react-router-dom';
    import blogPost from '../data/blogPosts';
    import styles from './Home.module.css';
    import {useState} from 'react'

    function Home(){
        const [keyword , setKeyword] = useState('');
        const [searchParams , setSearch] = useSearchParams({});

        const title = searchParams.get('title');
        const filtered = title ? blogPost.filter(val => val.title.toLowerCase().includes(title.toLowerCase()))  
        : blogPost;

        return(
            <div>
                <h1>Danh sách bài viết mới nhất</h1>
                <input type="text"  onChange={(e) => setKeyword(e.target.value)} />
                <button onClick={() => setSearch({title : keyword})}>Tìm kiếm</button>
                <button onClick={() => setSearch({})}>Xóa bộ lọc</button>

                <div>
                    {filtered.map(post => 
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
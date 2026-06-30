// Định nghĩa component Blog -> lấy dữ liệu chi tiết từ blog khi nhấn Link của từng blog trong Home

    import {useParams , Link} from 'react-router-dom';
    import blogPosts from '../data/blogPosts';
    import styles from './Blog.module.css';

    // component Blog chứa chi tiết của 1 bài viết dựa trên id động của đường dẫn
    function Blog(){
        // lấy giá trị động trên đường dẫn sử dụng hook useParams() trả về 1 đối tượng key là từ khóa trên đường dẫn ban đầu :id , value giá trị sau khi thay đổi

        const {id} = useParams();
        const post = blogPosts.find(p => p.id === parseInt(id));

        if(!post){
            return (
                <>
                    <p>Bài viết không tồn tại...</p>
                    <Link to='/'>Quay lại trang chủ</Link>
                </>
            )
        }

        return(
            <article className={styles.article}>
                <h1>Tiêu đề : {post.title}</h1>
                <p><em>Tác giả : {post.author}</em></p>
                <div>{post.content}</div>
                <Link to='/'>Quay lại trang chủ</Link>
            </article>
        );
    }

    export default Blog;


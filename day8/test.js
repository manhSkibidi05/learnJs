function fetchWithRetry(url, maxRetries = 2) {
    let attempt = 0;
    function attemptFetch() {
        return fetch(url)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .catch(err => {
                attempt++;
                if (attempt <= maxRetries) {
                    console.log(`Retry ${attempt}/${maxRetries} for ${url}`);
                    return attemptFetch();
                }
                throw err;
            });
    }
    return attemptFetch();
}

function loadDashboard() {
    const urls = {
        users: 'https://jsonplaceholder.typicode.com/users',
        posts: 'https://jsonplaceholder.typicode.com/postss',
        comments: 'https://jsonplaceholder.typicode.com/comments'
    };
    
    Promise.all([
        fetchWithRetry(urls.users),
        fetchWithRetry(urls.posts),
        fetchWithRetry(urls.comments)
    ])
    .then(([users, posts, comments]) => {
        console.log(`Tổng users: ${users.length}`);
        console.log(`Tổng posts: ${posts.length}`);
        console.log(`Tổng comments: ${comments.length}`);
        console.log(`Bài viết trung bình/user: ${posts.length / users.length}`);
    })
    .catch(err => console.error('Dashboard failed:', err));
}

loadDashboard();
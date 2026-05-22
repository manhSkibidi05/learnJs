// Ôn tập mục 3 : Tư duy thànnh phần : Tách biệt logic và giao diện (state -> render)

    // 1. Vấn đề : Code lộn xộn khi can thiệp trực tiếp vào DOM 
    // - Trong các ứng dụng JS truyền thống (jQuery hay DOM thuần) , người ta thường can thiệp trực tiếp vào DOM để thay đổi giao diện : Thêm , xóa , sửa phần tử 
    // toggle class,... Khi ứng dụng lớn lên , code trở nên rối rắm vì :
        // + Logic thay đổi dữ liệu và thao tác DOM xen kẽ nhau 
        // + Khó kiểm soát trạng thái của ứng dụng (state)
        // + Khó debug vì không biết lúc nào giao diện đồng bộ với dữ liệu 
        // + Khi thêm tính năm mới (lọc , tìm kiếm) , bạn phải viết thêm nhiều code DOM rải rác 
    // vd : Viết kiểu cũ (thao tác DOM trực tiếp)

        // thêm task 
        function addTask(content){
            const taskDiv = document.createElement(`div`);
            taskDiv.textContent = content;
            document.getElementById('list').appendChild(taskDiv);
            // Cập nhật thống kê...
            document.getElementById('total').textContent = tasks.length + 1;
        }
        // xóa task
        function deleteTask(){
            div.remove();
            //lại cập nhật lại thông kê
        }
        // lọc task : Phải duyệt từng phần tử DOM để ẩn / hiện
        function filterCompleted() {
            document.querySelectorAll('.task').forEach(task => {
                if (task.classList.contains('completed')) task.style.display = 'block';
                else task.style.display = 'none';
            });
        }
        // -> Nhược điểm : Mỗi thao tác đều can thiệp trực tiếp vào DOM , dữ liệu (tasks) và giao diện không đồng bộ tự nhiên

    // 2.Giải pháp : Tách biệt state và render 
    // - State là toàn bộ dữ liệu mô tả giao diện tại 1 thời điểm 
    // - Render là hàm tạo ra giao diện (DOM) hoàn toàn từ State 
    // -> Luồng hoạt động : State -> Render -> DOM -> người dùng tương tác DOM -> cập nhật lại State ->...
        
        // + Bạn không can thiệp trực tiếp vào DOM khi có sự kiện 
        // + Khi có sự kiện , bạn cập nhật lại state (mảng , obj...)
        // + Sau đó gọi Render vẽ lại toàn bộ giao diện dựa trên State mới 
        // + Render sẽ xóa hêt DOM cũ và tạo mới hoàn toàn từ State 
    
    // 3. VD minh họa 
        // 3.1. State 
        // mảng task -> chứa các dữ liệu state -> sẽ được render hiện thị dựa trên các dữ liệu này
        let tasks = [
            {id : 1 , content : `học js` , completed : true} , 
            {id : 2 , content : `học js` , completed : true}
        ];
        // biến điều kiện -> khi thay đổi giá trị các biến này state thay đổi dẫn đến render lại 
        let filter = `all`;
        let searchKeyword = ``;

        // 3.2. Hàm Render (tạo lại toàn bộ giao diện)
        function render(){
            // gọi khối container -> khối này là khối hiển thị giao diện  
            const container = document.getElementById('todo-list');
            // xóa toàn bộ nội dung hiện thị cũ trong khối 
            container.innerHTML = '';

            // clone 1 tasks mới với dữ liệu của tasks -> khi cần thay đổi nội dung task không làm ảnh hưởng tới mảng task chính 
            let filteredTasks = [...tasks];
            // mảng task clone này sẽ thay đổi dữ liệu hiện thị dữ liệu theo điều kiện dựa trên các phần tử thay đổi state
            if (filter === 'completed') filteredTasks = filteredTasks.filter(t => t.completed);
            if (filter === 'pending') filteredTasks = filteredTasks.filter(t => !t.completed);
            if (searchKeyword) {
                filteredTasks = filteredTasks.filter(t => t.content.includes(searchKeyword));
            }

            // dựa trên dữ liệu state thay đổi -> hiện thị những dữ liệu cần thiết 
            filteredTasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
                taskDiv.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''}>
                    <span>${task.content}</span>
                    <button class="delete">Xóa</button>
                `;
                // Gắn sự kiện (có thể dùng event delegation hoặc gắn trực tiếp)
                const checkbox = taskDiv.querySelector('input');
                checkbox.addEventListener('change', () => toggleComplete(task.id));
                const deleteBtn = taskDiv.querySelector('.delete');
                deleteBtn.addEventListener('click', () => deleteTask(task.id));
                container.appendChild(taskDiv);
            });

            // hiện thị dữ liệu dựa trên state
            document.getElementById('total').textContent = tasks.length;
            document.getElementById('completed').textContent = tasks.filter(t => t.completed).length;
        }

        //3.3. Các hàm thay đổi state (không chạm và DOM)
        
        // hàm thêm task mới -> Khi định nghĩa các hàm sẽ không chạm vào DOM 
        function addTask(content) {
            tasks.push({ id: Date.now(), content, completed: false });
            render(); // ← chỉ cần gọi render lại
        }

        function deleteTask(id) {
            tasks = tasks.filter(t => t.id !== id);
            render();
        }

        function toggleComplete(id) {
            const task = tasks.find(t => t.id === id);
            if (task) task.completed = !task.completed;
            render();
        }

        function setFilter(newFilter) {
            filter = newFilter;
            render();
        }

        function setSearch(keyword) {
            searchKeyword = keyword;
            render();
        }
        // lúc này các hàm chỉ cập nhật các dữ liệu state (các dữ liệu khi thay đổi sẽ ảnh hưởng tới giao diện) 
        // sau khi cập nhật xong dữ liệu state chỉ cần gọi lại render() -> dựa trên dữ liệu state mới mà hiện thị lại giao diện

        //3.4. Các sự kiện gắn ở ngoài (Chỉ gọi hàm thay đổi state)
        
        document.getElementById('add-btn').addEventListener('click', () => {
            const input = document.getElementById('new-todo');
            addTask(input.value);
            input.value = '';
        });

        document.getElementById('filter-all').addEventListener('click', () => setFilter('all'));
        //  khi sự kiện diễn ra trên trang web dựa vào sự kiện đó sẽ lấy dữ liệu do người dùng thay đổi trên DOM
        // dựa vào dữ liệu đó cập nhật lại dữ liệu trong state thông qua các hàm thay đổi state
        // và dựa vào state thay đổi -> lại cập nhật lại trang web dựa trên hàm render()

    // 4. Lợi ích tư duy State -> Render()

        // 1. Đồng bộ dữ liệu - giao diện : Giao diện luôn phản ảnh chính xác state , không bị lệch
        // 2. Dễ debug : Bạn chỉ cần kiểm tra lại state còn render hàm thuần chỉ hiện thị giao diện dựa trên state 
        // 3. Dễ thêm tính năng : Thêm filter hay search chỉ cần thay đổi state và render lại , không cần sửa DOM thủ công 
        // 4. Testing dễ dàng : Có thể test state và hàm render riêng biệt 
        // 5. Tiến tới các framework : (state -> virtual DOM -> real DOM)

    // 5. Nhược điểm và cách khắc phục

        // - Hiệu năng : Render lại toàn bộ danh sách có thể chậm khi có nhiều phần tử 
        // -> Giải pháp : Dùng documentFragment , hoặc chỉ render những phần tử những phần tử thay đổi (cần thuật toán so sánh)
        // -> Trong thực tế các framework giải quyết = virtual DOM

        // - Mất focus input , state của các thành phần con : vd khi input đang gõ bị reset mỗi lần render 
        // -> Giải pháp : Lưu giá trị tạm thời ra state riêng hoặc tối ưu render
//  1 . các state cần quản lý -> state là các dữ liệu làm thay đổi giao diện : khi thay đổi các dữ liệu này sẽ làm thay đổi giao diện hiện thị 

// - làm 1 app web chuẩn react -> chuyển từ state sang render : tất cả những thay đổi về giao diện lúc này sẽ đều ở trong render 
// -> khi 1 hoặc nhiều sự kiện diễn ra làm thay đổi các phần tử state dựa vào những phần tử này để gọi render cập nhật giao diện sau khi sự kiện diễn ra 
// -> tất cả sự kiện làm thay đổi giao diện đều phải gọi render và render giúp cập nhật giao diện dựa trên những sự kiện đó

// các phần tử state : nếu các phần tử này thay đổi sẽ ảnh hưởng tới giao diện 
// - tasks -> danh sách task 
let tasks = [];
// - currentFilter -> hiện thị các task được lọc 
let currentFilter = `all`;
// - currentSearch -> hiện thị các task phù hợp với điều kiện tìm kiếm
let currentSearch = ``;

// 2 . tạo hàm lấy danh sách sau khi lọc -> sau khi các dữ liệu thay đổi sẽ khởi tạo lại danh sách mới hiện thị lên giao diện 

// hàm này sẽ giúp lấy ra danh sách list cần hiện thị giữa trên những thay đổi của phần tử state
function getFilteredTasks(){
    // cập nhật lại ds task
    let filtered = [...tasks];

    // kiểm tra trường hợp lọc
    if(currentFilter === `done`){
        filtered = filtered.filter(task => task.completed === true)
    }else if(currentFilter === `wait`){
        filtered = filtered.filter(task => task.completed === false)
    }

    // kiểm tra trường hợp tìm kiếm 
    if(currentSearch.trim() !== ``){
        currentSearch = currentSearch.trim().toLowerCase();
        filtered = filtered.filter(task => task.content.toLowerCase().includes(currentSearch));
    }

    // trả về danh sách sau khi đi qua tất cả điều kiện 
    return filtered;
}

// 3. tạo hàm render vẽ lại toàn bộ giao diện -> dựa trên những thay đổi của state sẽ cập nhật lại danh sách hiện thị trên giao diện 

// - hàm render : mọi thay đổi giao diện đều ở trong render()
function render(){
    // thay đổi về tổng số task hiện thị mỗi lầ thêm/xóa...
    const totalAll = tasks.length;
    const totalDone = tasks.filter(task => task[`completed`]).length;
    const totalWait = tasks.filter(task => !task[`completed`]).length;
    
    const totalList = document.querySelector(`.total-list`).textContent = `Tổng : ${totalAll}`;
    const totalListDone = document.querySelector(`.total-list-done`).textContent = `Hoàn thành : ${totalDone}`;
    const totalListWait = document.querySelector(`.total-list-wait`).textContent = `Chưa làm : ${totalWait}` ;

    // thay đổi về các task sẽ hiện thị : 
    // + cập nhật lại phần tử show xóa toàn bộ phần tử cũ (task) hiện thị cũ 
    const show = document.querySelector(`.show`);
    show.innerHTML = ``;

    // + cập nhật với danh sách task cần hiện thị 
    tasksUpdate = getFilteredTasks();

    // + kiểm tra trường hợp rỗng : 1. rỗng khi xóa hết task 2. rỗng khi dữ liệu tìm kiếm không hợp lệ 
    if(tasksUpdate.length === 0){
        // -> nếu rỗng hiện thị chữ khum có task 
        let smallText = document.createElement(`small`);
        smallText.className =`text-red-500`;
        smallText.textContent = `Khum có task nào ở đây cả !`;

        show.appendChild(smallText);

        return;
    }

    // + hiện thị task trong danh sách các task cần hiện thị 
    for(let task of tasksUpdate){
        // tạo task mới dựa trên dữ liệu trong danh sách 
        let elementTask = createElementTask(task);
        // thêm task con vào show
        show.appendChild(elementTask);
    }

    // + lưu những thay đổi vào localStorage -> vì mỗi lần gọi render đều là ảnh hưởng tới dữ liệu nên cần cập nhật lại dữ liệu đó vào localStorage tránh không đồng bộ
    saveToLocalStorage();
}

// 4. tách riêng hàm createElementTask(task) để tạo 1 task dom -> dựa vào danh sách được cập nhật tùy vào số lượng task cần hiện thị sẽ tạo số task dom tương ứng

// + hàm tạo ra phần tử task mới hiện thị 
function createElementTask(task){
    let showTask = document.createElement(`div`);
    showTask.className = `show-task flex justify-between border-b border-gray-400 items-center mb-3`;
    
    let showTaskChild = document.createElement(`div`);
    showTaskChild.className = `flex gap-2`;

    let inputCheckbox = document.createElement(`input`);
    inputCheckbox.type = `checkbox`;
    inputCheckbox.className = `show-task-remote`;
    inputCheckbox.checked = task.completed;

    let contentTask = document.createElement(`p`);
    contentTask.className = `show-task-text`;
    contentTask.textContent = task.content;

    showTaskChild.appendChild(inputCheckbox);
    showTaskChild.appendChild(contentTask);

    let btnRemove = document.createElement(`button`);
    btnRemove.type = `button`;
    btnRemove.className = `show-task-remove bg-red-200 px-3 py-1 rounded-md mb-1 cursor-pointer`;
    btnRemove.textContent = `Xóa`;

    // 2 sự kiện thay đổi phần tử state được tạo hàm riêng và truyền vào id của task nhận sự kiện đó
    inputCheckbox.addEventListener(`change` , ()=>{
        changeTaskCompleted(task.id);
    })

    btnRemove.addEventListener(`click`, ()=>{
        removeTask(task.id);
    })

    showTask.appendChild(showTaskChild);
    showTask.appendChild(btnRemove);

    return showTask;
}

// 5. cập nhật các hàm làm thay đổi state 
// -> các hàm sẽ chạy khi sự kiện diễn ra làm thay đổi state và khi thay đổi state cần cập nhật danh sách hiện thị cuối cùng render lại giao diện

// - các hàm này sẽ làm thay đổi phần tử state và chúng sẽ khởi chạy khi sự kiện diễn ra nên mỗi khi kết thúc hàm gọi render() để cập nhật giao diện 
// + hàm thêm task
function addNewTask(value){
    let newTask = {
        id : new Date().getTime(),
        content : value,
        completed : false
    }
    tasks.push(newTask);
    render();
}

// + hàm xóa task
function removeTask(id){
    tasks = tasks.filter(task => task.id !== id);
    render();
}

// + hàm thay đổi trạng thái của task 
function changeTaskCompleted(id){
    let task = tasks.find(task => task.id === id);
    if(task.completed){
        task.completed = false;
    }else{
        task.completed = true;
    }
    render();
}

// + hàm hiện thị task phù hợp vs điều kiện lọc
function setFilter(filter){
    currentFilter = filter;
    render();
}

// + hàm hiện thị task phù hợp vs tìm kiếm 
function setSearch(keyWord){
    currentSearch = keyWord;
    render();
}

// 6 . gán sự kiện cho các phần tử làm thay đổi state -> khi sự kiện diễn ra làm thay đổi state sẽ gọi các hàm thay đổi state phù hợp với từng sự kiện 

// + các sự kiện xảy ra và gọi lại các hàm được định nghĩa trên sau đó gọi tiếp đến render() cập nhật giao diện thông qua sự kiện
const inputAdd = document.querySelector(`.add-input`);
const btnAdd = document.querySelector(`.add-button`);

// + thêm task mới
btnAdd.addEventListener(`click` , ()=>{
    addNewTask(inputAdd.value);
    inputAdd.value = ``;
})

const btnFilterAll = document.querySelector(`.filter-all`);
const btnFilterDone = document.querySelector(`.filter-done`);
const btnFilterWait = document.querySelector(`.filter-wait`);

// + thay đổi điều kiện lọc 
btnFilterAll.addEventListener(`click` , ()=>{
    setFilter(`all`);
})

btnFilterDone.addEventListener(`click` , ()=>{
    setFilter(`done`);
})

btnFilterWait.addEventListener(`click` , ()=>{
    setFilter(`wait`);
})

const searchInput = document.querySelector(`.search-input`);

function debounce(func , timeouts){
    let timeoutId;
    return function(...args){
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=>{
            func.apply(this , args);
        },timeouts)
    }
}

const debounceSearch = debounce(setSearch , 500);

// + debounce hàm tìm kiếm -> chỉ trả về giữ liệu cho hàm sau khi không còn hàm nào chạy trong 500ms
searchInput.addEventListener(`input` , ()=>{
    debounceSearch(searchInput.value);
})


// 7. thêm localStorage -> khi thay đổi dữ liệu state và làm thay đổi giao diện thì cập nhật lại localStorage lưu trữ lại những dữ liệu thay đổi khi reload lại trang 
// không mất dữ liệu đã lưu trước đó

// + hàm này giúp cập nhật lại dữ liệu mỗi lần reload lại web -> dựa trên dữ liệu đó thì giao diện sẽ hiển thị giữ nguyên so với lần cuối sử dụng 
function loadFromLocalStorage(){
    let data = localStorage.getItem(`tasks`);
    if(data){
        tasks = JSON.parse(data);
    }else{
        tasks = [];
    }
}

// + hàm này sẽ lưu lại những dữ liệu thay đổi  
function saveToLocalStorage(){
    let data = JSON.stringify(tasks);
    localStorage.setItem(`tasks` , data);
}

// + gọi hàm này cập nhật lại dữ liệu -> thay đổi phần tử state
loadFromLocalStorage();
// + cập nhật lại giao diện dựa trên nó 
render();
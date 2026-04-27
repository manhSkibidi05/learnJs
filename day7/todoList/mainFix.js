//  1 . các state cần quản lý -> state là các dữ liệu làm thay đổi giao diện : khi thay đổi các dữ liệu này sẽ làm thay đổi giao diện hiện thị 
let tasks = [];
let currentFilter = `all`;
let currentSearch = ``;

// 2 . tạo hàm lấy danh sách sau khi lọc -> sau khi các dữ liệu thay đổi sẽ khởi tạo lại danh sách mới hiện thị lên giao diện 

function getFilteredTasks(){
    let filtered = [...tasks];

    if(currentFilter === `done`){
        filtered = filtered.filter(task => task.completed === true)
    }else if(currentFilter === `wait`){
        filtered = filtered.filter(task => task.completed === false)
    }

    if(currentSearch.trim() !== ``){
        currentSearch = currentSearch.trim().toLowerCase();
        filtered = filtered.filter(task => task.content.toLowerCase().includes(currentSearch));
    }

    return filtered;
}

// 3. tạo hàm render vẽ lại toàn bộ giao diện -> dựa trên những thay đổi của state sẽ cập nhật lại danh sách hiện thị trên giao diện 

function render(){
    const totalAll = tasks.length;
    const totalDone = tasks.filter(task => task[`completed`]).length;
    const totalWait = tasks.filter(task => !task[`completed`]).length;
    
    const totalList = document.querySelector(`.total-list`).textContent = `Tổng : ${totalAll}`;
    const totalListDone = document.querySelector(`.total-list-done`).textContent = `Hoàn thành : ${totalDone}`;
    const totalListWait = document.querySelector(`.total-list-wait`).textContent = `Chưa làm : ${totalWait}` ;

    const show = document.querySelector(`.show`);
    show.innerHTML = ``;

    tasksUpdate = getFilteredTasks();

    if(tasksUpdate.length === 0){
        let smallText = document.createElement(`small`);
        smallText.className =`text-red-500`;
        smallText.textContent = `Khum có task nào ở đây cả !`;

        show.appendChild(smallText);

        return;
    }

    for(let task of tasksUpdate){
        let elementTask = createElementTask(task);
        show.appendChild(elementTask);
    }

    saveToLocalStorage();
}

// 4. tách riêng hàm createElementTask(task) để tạo 1 task dom -> dựa vào danh sách được cập nhật tùy vào số lượng task cần hiện thị sẽ tạo số task dom tương ứng

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

function addNewTask(value){
    let newTask = {
        id : new Date().getTime(),
        content : value,
        completed : false
    }
    tasks.push(newTask);
    render();
}

function removeTask(id){
    tasks = tasks.filter(task => task.id !== id);
    render();
}

function changeTaskCompleted(id){
    let task = tasks.find(task => task.id === id);
    if(task.completed){
        task.completed = false;
    }else{
        task.completed = true;
    }
    render();
}

function setFilter(filter){
    currentFilter = filter;
    render();
}

function setSearch(keyWord){
    currentSearch = keyWord;
    render();
}

// 6 . gán sự kiện cho các phần tử làm thay đổi state -> khi sự kiện diễn ra làm thay đổi state sẽ gọi các hàm thay đổi state phù hợp với từng sự kiện 

const inputAdd = document.querySelector(`.add-input`);
const btnAdd = document.querySelector(`.add-button`);

btnAdd.addEventListener(`click` , ()=>{
    addNewTask(inputAdd.value);
    inputAdd.value = ``;
})

const btnFilterAll = document.querySelector(`.filter-all`);
const btnFilterDone = document.querySelector(`.filter-done`);
const btnFilterWait = document.querySelector(`.filter-wait`);

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

searchInput.addEventListener(`input` , ()=>{
    debounceSearch(searchInput.value);
})


// 7. thêm localStorage -> khi thay đổi dữ liệu state và làm thay đổi giao diện thì cập nhật lại localStorage lưu trữ lại những dữ liệu thay đổi khi reload lại trang 
// không mất dữ liệu đã lưu trước đó

function loadFromLocalStorage(){
    let data = localStorage.getItem(`tasks`);
    if(data){
        tasks = JSON.parse(data);
    }else{
        tasks = [];
    }
}

function saveToLocalStorage(){
    let data = JSON.stringify(tasks);
    localStorage.setItem(`tasks` , data);
}

loadFromLocalStorage();
render();
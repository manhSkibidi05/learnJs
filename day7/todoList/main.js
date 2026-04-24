let tasks = [];

// chức năng thêm mới task
const addInput = document.querySelector(`.add-input`);
const addButton = document.querySelector(`.add-button`);

function addNewTask(task){
    tasks.push(task);
}   

// chức năng hiển thị và cập nhật trạng thái task  
const show = document.querySelector(`.show`);

function createNewTask(task){
    // tạo cấu trúc hiện thị 1 task
    const taskDiv = document.createElement(`div`);
    taskDiv.className = 'show-task flex justify-between border-b border-gray-400 items-center mb-3';

    const taskDivChild = document.createElement(`div`);
    taskDivChild.className = `flex gap-2`;

    const checkBox = document.createElement(`input`);
    checkBox.className = `show-task-remote`;
    checkBox.type = `checkbox`;
    checkBox.checked = task[`completed`];

    const para = document.createElement(`p`);
    para.className = `show-task-text`
    para.textContent = task[`content`];

    taskDivChild.appendChild(checkBox);
    taskDivChild.appendChild(para);

    const buttonRemove = document.createElement(`button`);
    buttonRemove.className = `show-task-remove bg-red-200 px-3 py-1 rounded-md mb-1 cursor-pointer`;
    buttonRemove.textContent = `Xóa`;
    buttonRemove.type = `button`;

    taskDiv.appendChild(taskDivChild);
    taskDiv.appendChild(buttonRemove);

    // thêm sự kiện cho task
    checkBox.addEventListener(`change` , ()=>{
        if(checkBox.checked){
            task[`completed`] = true;
            para.classList.add(`line-through`);
        }else{
            task[`completed`] = false;
            para.classList.remove(`line-through`);
        }
        totalTasks(tasks);
    })

    // thêm sự kiện cho button xóa -> khi click sẽ xóa task mà nó đang ở -> xóa chính mình 
    buttonRemove.addEventListener(`click` , ()=>{
        let index = tasks.findIndex(value=>value[`content`] == task[`content`]);
        if(index >= 0){
            tasks.splice(index , 1);
        }
        totalTasks(tasks);

        taskDiv.remove();
    })

    show.appendChild(taskDiv);
}

addButton.addEventListener(`click` , ()=>{
    if(addInput.value){
        let task = {
        content : addInput.value,
        completed : false
        };
        
        addNewTask(task);
        createNewTask(task);

        totalTasks(tasks);
    }
    addInput.value = ``;

    
});

// chức năng tổng hợp task
let totalList = document.querySelector(`.total-list`);
let totalListDone = document.querySelector(`.total-list-done`);
let totalListWait = document.querySelector(`.total-list-wait`);

function totalTasks(tasks){
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    for(let task of tasks){
        if(task[`completed`] === true){
            count2++;
        }else{
            count3++;
        }
        count1++;
    }
    totalList.textContent = `Tổng : ${count1}`;
    totalListDone.textContent = `Hoàn thành : ${count2}`;
    totalListWait.textContent = `Chưa làm : ${count3}`;
}


// chức năng phân loại task 
let filterBtnAll = document.querySelector(`.filter-all`);
let filterBtnDone = document.querySelector(`.filter-done`);
let filterBtnWait = document.querySelector(`.filter-wait`);

function updateTask(){
    let tasksShow = document.querySelectorAll(`.show-task-remote`);
    tasksShow.forEach(task=>{
        task.closest(`.show-task`).classList.remove(`hidden`);
    })
}

function updateTaskDone(){
    let tasksShow = document.querySelectorAll(`.show-task-remote`);
    tasksShow.forEach(task =>{
        if(!task.checked){
            task.closest(`.show-task`).classList.add(`hidden`);
        }else{
            task.closest(`.show-task`).classList.remove(`hidden`);
        }
    })
}

function updateTaskWait(){
    let tasksShow = document.querySelectorAll(`.show-task-remote`);
    tasksShow.forEach(task =>{
        if(task.checked){
            task.closest(`.show-task`).classList.add(`hidden`);
        }else{
            task.closest(`.show-task`).classList.remove(`hidden`);
        }
    })
}
filterBtnAll.addEventListener(`click` , ()=>{
    updateTask();
    if(!filterBtnAll.classList.contains(`bg-red-200`)){
        filterBtnAll.classList.add(`bg-red-200`);
        filterBtnDone.classList.remove(`bg-red-200`);
        filterBtnWait.classList.remove(`bg-red-200`);
    }
});

filterBtnDone.addEventListener(`click` , ()=>{
    updateTaskDone();
    if(!filterBtnDone.classList.contains(`bg-red-200`)){
        filterBtnDone.classList.add(`bg-red-200`);
        filterBtnAll.classList.remove(`bg-red-200`);
        filterBtnWait.classList.remove(`bg-red-200`);
    }
});

filterBtnWait.addEventListener(`click` , ()=>{
    updateTaskWait();
    if(!filterBtnWait.classList.contains(`bg-red-200`)){
        filterBtnWait.classList.add(`bg-red-200`);
        filterBtnDone.classList.remove(`bg-red-200`);
        filterBtnAll.classList.remove(`bg-red-200`);
    }
});

// chức năng tìm kiếm 
const searchInput = document.querySelector(`.search-input`);
const searchWarning = document.querySelector(`.search-warning`);

function searchTask(string){
    let textTasks = document.querySelectorAll(`.show-task-text`);
    if(!string){
        searchWarning.textContent = `không tồn tại`;
    }else{
        searchWarning.textContent = ``;
    }
    for(let char of string){
        for(let task of textTasks){
            if(task.textContent.indexOf(char) >= 0){
                task.closest(`.show-task`).classList.remove(`hidden`);
            }else{
                task.closest(`.show-task`).classList.add(`hidden`);
            }
        }
    }
}

function debounce(func , timeout){
    let idTimeout;
    return function(...args){
        clearTimeout(idTimeout);
        idTimeout = setTimeout(()=>{
            func.apply(this , args);
        },timeout)
    }
}

const debounceSearch = debounce(searchTask , 500);

searchInput.addEventListener(`input` , ()=>{
    let valueInput = searchInput.value;
    debounceSearch(valueInput);
})


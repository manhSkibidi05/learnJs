let tasks = [];
let tasksDone = [];
let tasksWait = [];

// chức năng thêm mới task
const addInput = document.querySelector(`.add-input`);
const addButton = document.querySelector(`.add-button`);

function addNewTask(task){
    tasks.push(task);
    tasksWait.push(task);
    showAllTask(task);
    filterAll(tasks);
    filterWait(tasksWait);
}   

// chức năng hiển thị và cập nhật trạng thái task  
const show = document.querySelector(`.show`);

function showAllTask(task){
    // tạo cấu trúc hiện thị 1 task
    const taskDiv = document.createElement(`div`);
    taskDiv.className = 'show-task flex justify-between border-b border-gray-400 items-center mb-3';

    const taskDivChild = document.createElement(`div`);
    taskDivChild.className = `flex gap-2`;

    const checkBox = document.createElement(`input`);
    checkBox.className = `show-task-remote`;
    checkBox.type = `checkbox`;

    const para = document.createElement(`p`);
    para.className = `show-task-text`
    para.textContent = task;

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
            tasksDone.push(task);
            tasksWait.pop(task);
            para.classList.add(`line-through`);
        } else{
            tasksWait.push(task);
            tasksDone.pop(task);
            para.classList.remove(`line-through`);
        }
        filterDone(tasksDone);
        filterWait(tasksWait);
    })





    show.appendChild(taskDiv);
}

addButton.addEventListener(`click` , ()=>{
    let task = addInput.value
    addNewTask(task);
    addInput.value = ``;
    
});

// chức năng tổng hợp task
let totalList = document.querySelector(`.total-list`);
let totalListDone = document.querySelector(`.total-list-done`);
let totalListWait = document.querySelector(`.total-list-wait`);

function filterAll(tasks){
    let count = 0;
    for(let task of tasks){
        count++;
    }
    totalList.textContent = `Tổng : ${count}`;
}

function filterDone(tasks){
    let count = 0;
    for(let task of tasks){
        count++;
    }
    totalListDone.textContent = `Hoàn thành : ${count}`;
}

function filterWait(tasks){
    let count = 0;
    for(let task of tasks){
        count++;
    }
    totalListWait.textContent = `Chưa làm : ${count}`;
}











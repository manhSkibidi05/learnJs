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

        taskDiv.classList.add(`hidden`);
    })

    show.appendChild(taskDiv);
}

addButton.addEventListener(`click` , ()=>{
    let task = {
        content : addInput.value,
        completed : false
    };
    addInput.value = ``;
    
    addNewTask(task);
    createNewTask(task);

    totalTasks(tasks);
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
let tasksCompleted = tasks.filter(value=> value[`completed`] === true);
let tasksUnCompleted = tasks.filter(value=> value[`completed`] === false);









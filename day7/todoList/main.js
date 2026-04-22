let tasks = [];
let tasksDone = [];
let taskWait = [];

// chức năng thêm mới task
const addInput = document.querySelector(`.add-input`);
const addButton = document.querySelector(`.add-button`);

function addNewTask(task){
    tasks.push(task);
}   

// chức năng hiển thị và cập nhật trạng thái task  
const show = document.querySelector(`.show`);

function showAllTask(){
    show.innerHTML = ``;
    for(task of tasks){
        show.innerHTML += `<div class="show-task flex justify-between border-b border-gray-400 items-center mb-3">
                <div class="flex gap-2">
                    <input class="show-task-remote" type="checkbox" name="" id="" value="${task}">
                    <p class="show-task-text">${task}</p>
                </div>
                <button type="button" class="show-task-remove bg-red-200 px-3 py-1 rounded-md mb-1 cursor-pointer">Xóa</button>
            </div>`
    }
}

addButton.addEventListener(`click` , ()=>{
    let task = addInput.value
    addNewTask(task);
    addInput.value = ``;
    showAllTask();
});

const showTask = document.querySelectorAll(`.show-task`);
const remoteTask = document.querySelectorAll(`.show-task-remote`);
const textTask = document.querySelectorAll(`.show-task-text`);
const removeTask = document.querySelectorAll(`show-task-remove`);

remoteTask.forEach((task)=>{
    task.addEventListener(`change`, ()=>{
        console.log(task)
    })
})









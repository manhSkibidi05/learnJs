// mảng lưu trữ các tasks 
// mỗi task lúc này là 1 object chứa thông tin bao gồm : + nội dung của task đó + trạng thái của task
let tasks = [];

// chức năng thêm mới task
// addInput là ô input nhập giá trị -> dựa vào giá trị này để thêm nội dung task
const addInput = document.querySelector(`.add-input`);
// addButton là button thêm -> dựa vào sự kiện click của button này để thêm 1 task mới
const addButton = document.querySelector(`.add-button`);

// hàm thêm task mới 
function addNewTask(task){
    tasks.push(task);
}   

// chức năng hiển thị và cập nhật trạng thái task  
// show là phần thẻ cha chứa thẻ con task để hiện thị trên màn hình 
const show = document.querySelector(`.show`);

// hàm tạo thẻ mới -> dựa vào nội dung task người dùng nhập vào tạo thẻ task mới để hiện thị -> định nghĩa task để hiển thị lên màn hình
function createNewTask(task){
    // tạo cấu trúc hiện thị 1 task
    // dựa vào phương thức createElement() : tạo thẻ cần thiết
    const taskDiv = document.createElement(`div`);
    // dựa vào thuộc tính className : thêm các lớp cần thiết 
    taskDiv.className = 'show-task flex justify-between border-b border-gray-400 items-center mb-3';

    const taskDivChild = document.createElement(`div`);
    taskDivChild.className = `flex gap-2`;

    // những thẻ đặc biệt như input thêm các thuộc tính type , checked
    const checkBox = document.createElement(`input`);
    checkBox.className = `show-task-remote`;
    checkBox.type = `checkbox`;
    checkBox.checked = task[`completed`];

    // thuộc tính textContent dùng để điều chỉnh phần text sẽ hiện thị của thẻ đó -> hiện thị phần content của task mới thêm vào
    const para = document.createElement(`p`);
    para.className = `show-task-text`
    para.textContent = task[`content`];

    // sử dụng phương thức appendChild(thẻ con) -> thêm thẻ con vào thẻ cha 
    taskDivChild.appendChild(checkBox);
    taskDivChild.appendChild(para);

    const buttonRemove = document.createElement(`button`);
    buttonRemove.className = `show-task-remove bg-red-200 px-3 py-1 rounded-md mb-1 cursor-pointer`;
    buttonRemove.textContent = `Xóa`;
    buttonRemove.type = `button`;

    taskDiv.appendChild(taskDivChild);
    taskDiv.appendChild(buttonRemove);
    // thêm luôn các sự kiện cho các thẻ mới tạo 
    // sự kiện change của thẻ input checkbox -> khi thay đổi lựa chọn checked lúc này sẽ gọi hàm callback
    checkBox.addEventListener(`change` , ()=>{
        // nếu checked = true -> thay đổi trạng thái task trong mảng = true và thêm dấu gạch cho thẻ p của task này
        if(checkBox.checked){
            task[`completed`] = true;
            para.classList.add(`line-through`);
        }
        // nếu false -> thay đổi trạng thái = false và xóa đi dấu gạch cho thẻ p của task này
        else{
            task[`completed`] = false;
            para.classList.remove(`line-through`);
        }
        // gọi hàm tổng hợp lại task -> khi sự kiện này diễn  ra sẽ làm thay đổi thuộc tính trạng thái của task (hoàn thành / chưa làm )
        // hiện thị lại những task hoàn thành và chưa làm 
        totalTasks(tasks);
    })

    // thêm sự kiện cho button xóa -> khi click sẽ xóa task mà nó đang ở -> xóa chính mình 
    // khi kích hoạt btn xóa này sẽ gọi hàm callback -> thêm sự kiện xóa luôn chính task này 
    buttonRemove.addEventListener(`click` , ()=>{
        // tìm vị trí index của phần content task cần xóa 
        let index = tasks.findIndex(value=>value[`content`] == task[`content`]);
        // nếu index >= 0 -> lúc này có tồn tại task
        if(index >= 0){
            // xóa task ở vị trí index ra khỏi mảng 
            tasks.splice(index , 1);
        }
        // gọi hàm tổng hợp lại task -> khi xóa 1 task ảnh hưởng tới số lượng nên gọi hàm này để cập nhật số lượng task trên màn hình
        totalTasks(tasks);
        // sử dụng phương thức remove() -> xóa thẻ này 
        taskDiv.remove();
    })

    // thêm thẻ mới (task mới) vào thẻ cha chứa các task hiện thị lên mh
    show.appendChild(taskDiv);
}

// lắng nghe sự kiện click btn thêm task mới 
addButton.addEventListener(`click` , ()=>{
    // kiểm tra nội dung trả về của input -> true là lúc này input khác rỗng ,null , undefined ...
    if(addInput.value){
        // khởi tạo obj task mới với 2 thuộc tính nội dung và trạng thái
        let task = {
        content : addInput.value,
        completed : false
        };
        
        // gọi hàm thêm task -> cập nhật task trong mảng
        addNewTask(task);
        // gọi hàm tạo task -> tạo task hiện thị lên màn hình
        createNewTask(task);
        // gọi hàm tổng hợp task -> hiện thị tổng số task lên màn hình
        totalTasks(tasks);
    }
    // cập nhật lại ô input
    addInput.value = ``;

});

// chức năng tổng hợp task
// 3 thẻ hiện thị tổng số task trên màn hình 
let totalList = document.querySelector(`.total-list`);
let totalListDone = document.querySelector(`.total-list-done`);
let totalListWait = document.querySelector(`.total-list-wait`);

function totalTasks(tasks){
    // 3 biến đếm : count1 đếm tổng tất cả task hiện tại
    // count2 đếm các task trạng thái true
    // count3 đếm các task trạng thái false
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    // duyệt mảng hiện tại được thêm vào để đếm
    for(let task of tasks){
        if(task[`completed`] === true){
            count2++;
        }else{
            count3++;
        }
        count1++;
    }
    // hiện thị lên màn hình sau khi đếm 
    totalList.textContent = `Tổng : ${count1}`;
    totalListDone.textContent = `Hoàn thành : ${count2}`;
    totalListWait.textContent = `Chưa làm : ${count3}`;
}


// chức năng phân loại task 
// 3 nút bấm mỗi nút 1 sự kiện để thay đổi những task sẽ được hiện thị 
let filterBtnAll = document.querySelector(`.filter-all`);
let filterBtnDone = document.querySelector(`.filter-done`);
let filterBtnWait = document.querySelector(`.filter-wait`);

// hàm này sẽ xóa tất cả lớp hidden -> hiện thị tất cả task
function updateTask(){
    let tasksShow = document.querySelectorAll(`.show-task-remote`);
    tasksShow.forEach(task=>{
        task.closest(`.show-task`).classList.remove(`hidden`);
    })
}


function updateTaskDone(){
    // gọi tất cả thẻ input checkbox hiện tại thành 1 mảng 
    let tasksShow = document.querySelectorAll(`.show-task-remote`);
    // duyệt từng phần tử trong mảng 
    // mỗi phần tử kiểm tra trạng thái checked hay chưa -> nếu chưa checked  sử dụng phương thức closet tìm phần tử cha gần nhất có class tương ứng thêm vào class hidden
    // nếu checked rồi xóa class hidden khỏi phần tử cha gần nhất  có class show-task
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
// gán sự kiện cho các nút bấm khi nút bấm kích hoạt sẽ gọi hàm tương ứng và hiện thị task tương ứng -> cập nhật thêm màu cho các nút bấm đó 
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
// searchInput : dựa vào nội dung của thẻ input này thay đổi sẽ gửi dữ liệu về rồi hiện thị những task có dữ liệu tương ứng
const searchInput = document.querySelector(`.search-input`);
// searchWarning : cảnh báo nếu lúc này ô input rỗng -> dữ liệu nhận về là dữ liệu falsy chuỗi rỗng , null , undefined...
const searchWarning = document.querySelector(`.search-warning`);

// hàm tìm kiếm task dựa trên chuỗi trả về 
function searchTask(string){
    // gọi tất cả các text của task hiện tại trả về 1 mảng 
    let textTasks = document.querySelectorAll(`.show-task-text`);
    // kiểm tra chuỗi trả về -> chuỗi false in ra cảnh báo 
    if(!string){
        searchWarning.textContent = `không tồn tại`;
    }else{
        searchWarning.textContent = ``;
    }
    // kiểm tra từng kí tự trong chuỗi trả về 
    for(let char of string){
        // dựa vào từng task trả về 
        for(let task of textTasks){
            // kiểm tra chuỗi mà người dùng nhập có nằm trong nội dung của task hay không -> nếu có indexOf() kiểm tra chuỗi con tồn tại hay không sẽ trả về vị trí chuỗi
            // con đó trong nội dung task 
            if(task.textContent.indexOf(char) >= 0){
                // nếu index >= 0 có tồn tại chuỗi con -> xóa hiện thị khỏi task
                task.closest(`.show-task`).classList.remove(`hidden`);
            }else{
                // nếu index âm -> ẩn task 
                task.closest(`.show-task`).classList.add(`hidden`);
            }
        }
    }
}

// áp dụng kĩ thuật debounce cho hàm tìm kiếm này
function debounce(func , timeout){
    let idTimeout;
    return function(...args){
        clearTimeout(idTimeout);
        idTimeout = setTimeout(()=>{
            func.apply(this , args);
        },timeout)
    }
}

// thêm hàm tìm kiếm vào debounce và thời gian timeout là 500 
const debounceSearch = debounce(searchTask , 500);

// sự kiện input của thẻ input : khi thay đổi nội dung thẻ input sẽ chạy hàm callback
searchInput.addEventListener(`input` , ()=>{
    let valueInput = searchInput.value;
    // gọi hàm debounceSearch truyền giá trị của input 
    // nhưng sẽ không chạy luôn vì chỉ chạy sau khi không diễn ra sự kiện input nữa sau 500ms -> đảm bảo dữ liệu tránh spam hàm liên tục 
    debounceSearch(valueInput);
})

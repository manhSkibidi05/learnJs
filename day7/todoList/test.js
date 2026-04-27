let tasks = [];
let currentFilter = 'all';
let searchKeyword = '';

// DOM elements
const addInput = document.querySelector('.add-input');
const addButton = document.querySelector('.add-button');
const searchInput = document.querySelector('.search-input');

// ----- Helper functions -----
function getFilteredTasks() { /* như trên */ }
function createTaskElement(task) { /* như trên */ }
function render() { /* như trên */ }
function addNewTask(content) { /* như trên */ }
function deleteTask(id) { /* như trên */ }
function toggleComplete(id) { /* như trên */ }
function setFilter(filter) { /* như trên */ }
function setSearch(keyword) { /* như trên */ }
function saveToLocalStorage() { /* ... */ }
function loadFromLocalStorage() { /* ... */ }

// ----- Debounce (giữ nguyên) -----
function debounce(func, delay) {  }
const debouncedSearch = debounce(() => setSearch(searchInput.value), 500);

// ----- Event listeners -----
addButton.addEventListener('click', () => {
    addNewTask(addInput.value);
    addInput.value = '';
});
searchInput.addEventListener('input', debouncedSearch);

document.querySelector('.filter-all').onclick = () => setFilter('all');
document.querySelector('.filter-done').onclick = () => setFilter('completed');
document.querySelector('.filter-wait').onclick = () => setFilter('pending');

// ----- Khởi tạo -----
loadFromLocalStorage();
render();
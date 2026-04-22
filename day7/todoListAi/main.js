// ---------- Model (Dữ liệu) ----------
let todos = [];
let currentFilter = 'all';
let searchKeyword = '';

// DOM elements
const todoListEl = document.getElementById('todoList');
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const searchInput = document.getElementById('searchInput');
const filterBtns = document.querySelectorAll('[data-filter]');
const totalCountEl = document.getElementById('totalCount');
const completedCountEl = document.getElementById('completedCount');
const pendingCountEl = document.getElementById('pendingCount');

// ---------- Helper functions ----------
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('todos');
    if (stored) {
        todos = JSON.parse(stored);
    } else {
        todos = [];
    }
}

// Tính thống kê
function updateStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    totalCountEl.textContent = total;
    completedCountEl.textContent = completed;
    pendingCountEl.textContent = pending;
}

// Lọc và tìm kiếm
function getFilteredTodos() {
    let filtered = [...todos];
    
    // Lọc theo trạng thái
    if (currentFilter === 'completed') {
        filtered = filtered.filter(t => t.completed);
    } else if (currentFilter === 'pending') {
        filtered = filtered.filter(t => !t.completed);
    }
    
    // Lọc theo từ khóa (case-insensitive)
    if (searchKeyword.trim() !== '') {
        const keyword = searchKeyword.trim().toLowerCase();
        filtered = filtered.filter(t => t.text.toLowerCase().includes(keyword));
    }
    
    return filtered;
}

// Render danh sách
function render() {
    const filteredTodos = getFilteredTodos();
    if (filteredTodos.length === 0) {
        todoListEl.innerHTML = '<li style="text-align:center; padding:20px;">Không có công việc nào</li>';
    } else {
        todoListEl.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span>${escapeHtml(todo.text)}</span>
                <button class="delete-btn">🗑️ Xóa</button>
            </li>
        `).join('');
    }
    updateStats();
}

// Xử lý ký tự đặc biệt để tránh XSS
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// ---------- CRUD operations ----------
function addTodo(text) {
    if (!text.trim()) {
        alert('Vui lòng nhập nội dung công việc');
        return false;
    }
    const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    saveToLocalStorage();
    render();
    return true;
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage();
    render();
}

function toggleComplete(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        render();
    }
}

// ---------- Debounce cho tìm kiếm ----------
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

function handleSearch() {
    searchKeyword = searchInput.value;
    render();
}

const debouncedSearch = debounce(handleSearch, 300);

// ---------- Event listeners ----------
addBtn.addEventListener('click', () => {
    addTodo(todoInput.value);
    todoInput.value = '';
    todoInput.focus();
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo(todoInput.value);
        todoInput.value = '';
    }
});

searchInput.addEventListener('input', debouncedSearch);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Cập nhật active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        render();
    });
});

// Event delegation cho checkbox và nút xóa
todoListEl.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;
    const id = parseInt(li.dataset.id);
    
    if (e.target.type === 'checkbox') {
        toggleComplete(id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTodo(id);
    } else if (e.target.tagName === 'SPAN') {
        // Click vào tên công việc cũng toggle (optional)
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
        toggleComplete(id);
    }
});

// ---------- Khởi tạo ----------
loadFromLocalStorage();
render();
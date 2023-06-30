const formcontrol = document.getElementById('formcontrol');
const input = document.getElementById('input');
const todooosul = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

todos.forEach(todo => addTodoToList(todo));

formcontrol.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = input.value.trim();

  if (todoText) {
    const todo = {
      text: todoText,
      completed: false
    };

    addTodoToList(todo);
    todos.push(todo);
    updateLocalStorage();
    input.value = '';
  }
}

function addTodoToList(todo) {
  const todonothing = document.createElement('li');
  todonothing.innerText = todo.text;
  todonothing.addEventListener('click', toggleTodo);
  todonothing.addEventListener('contextmenu', deleteTodo);

  if (todo.completed) {
    todonothing.classList.add('completed');
  }

  todooosul.appendChild(todonothing);
}

function toggleTodo() {
  this.classList.toggle('completed');
  updateLocalStorage();
}

function deleteTodo(e) {
  e.preventDefault();
  const todoText = this.innerText;
  const todoIndex = todos.findIndex(todo => todo.text === todoText);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    this.remove();
    updateLocalStorage();
  }
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}
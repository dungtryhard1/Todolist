let input = document.querySelector('input');
let button = document.querySelector('button');
let form = document.querySelector('form');
let ul = document.querySelector('.list');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let value = input.value.trim();

    if (!value) {
        alert('Please enter a task');
    } else {
        renderTasks({
            text: value,
        })
        saveTasks()
    }

    input.value = ''
})

function renderTasks(task) {
    var li = document.createElement('li');
    li.setAttribute('class', task.status)
    li.innerHTML = `
        <span>${task.text}</span>
        <i class="far fa-trash-alt"></i>
    `
    ul.appendChild(li);

    li.querySelector('i').addEventListener('click', function() {
        this.parentElement.remove()
        saveTasks()
    })

    li.addEventListener('click', function() {
        this.classList.toggle('completed')
        saveTasks()
    })
}

function saveTasks() {
    let todolist = document.querySelectorAll('li')

    let todoStorage = []

    todolist.forEach(function(item) {
        let text = item.querySelector('span').innerText
        let status = item.getAttribute('class')

        todoStorage.push({
            text,
            status
        })
    })

    localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

function initial() {
    let data = JSON.parse(localStorage.getItem('todolist'))
    data.forEach(function(item) {
        renderTasks(item)
    })
}

initial()



var id;
function saveTodo() {
    const todo = {
        isComplete: false,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
    };
    if (id === undefined) {
        fetch('http://localhost:3300/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // listTodos();
                appendTodo(res, document.getElementById('todos'));
                console.log(res);
            })
            .catch((err) => console.error(err));
    } else {
        fetch(`http://localhost:3300/todos/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(todo),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((res) => {
                // listTodos();
                document.getElementById(id).querySelector('.title').innerHTML =
                    res.title;
                id = undefined;
                console.log(res);
            })
            .catch((err) => console.error(err));
    }
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}

function listTodos() {
    const todosContainer = document.getElementById('todos');
    (Array.from(todosContainer.children) || []).forEach((c) => c.remove());
    fetch('http://localhost:3300/todos')
        .then((res) => {
            return res.json();
        })
        .then((result) => {
            result.forEach((todo) => {
                appendTodo(todo, todosContainer);
            });
        });
}

window.onload = function () {
    listTodos();
};
function appendTodo(todo, todosContainer) {
    console.log(todo);
    const li = document.createElement('li');
    li.setAttribute(
        'class',
        'my-2 p-3 border rounded d-flex flex-wrap justify-content-between'
    );
    li.setAttribute('id', todo.id);
    li.innerHTML = `
               <div class="title">${todo.title}</div>
               <div class="status">
                  <input type="checkbox">
               </div>`;
    li.onclick = function (ev) {
        document.getElementById('title').value = todo.title;
        document.getElementById('description').value = todo.description;
        id = todo.id;
    };
    li.querySelector("input[type='checkbox']").checked = todo.isComplete;
    todosContainer.appendChild(li);
}

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoArea = document.querySelector('#js-todo-area');
const countArea = document.querySelector('#count-area');

const todoItems = [];
let completeTodos = [];
let uncompleteTodos = [];

// タスクの数を数える
const countAll = document.getElementById('count-all');
const countComplete = document.getElementById('count-complete');
const countUncomplete = document.getElementById('count-uncomplete');
countAll.innerHTML = todoItems.length;
countComplete.innerHTML = completeTodos.length;
countUncomplete.innerHTML = uncompleteTodos.length;

todoForm.addEventListener("submit", event => {
    event.preventDefault();

    const newTaskArea = document.createElement('div');

    // チェックボックス生成
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    newTaskArea.appendChild(checkbox);
    checkbox.addEventListener('change', (event) => {
        if (event.target.checked) {
            // チェックがついたらタスクを未完了から完了にする
            uncompleteTodos.forEach(todo => {
                if (todo.id === newTaskItem.id) {
                    completeTodos.push(todo);
                    const index = uncompleteTodos.indexOf(todo);
                    uncompleteTodos.splice(index, 1);
                    countUncomplete.innerHTML = uncompleteTodos.length;
                    countComplete.innerHTML = completeTodos.length;
                }
            })
        } else {
            // チェックが外れたらタスクを完了から未完了にする
            completeTodos.forEach(todo => {
                if (todo.id === newTaskItem.id) {
                    uncompleteTodos.push(todo);
                    const index = completeTodos.indexOf(todo);
                    completeTodos.splice(index, 1);
                    countComplete.innerHTML = completeTodos.length;
                    countUncomplete.innerHTML = uncompleteTodos.length;
                }
            })
        }
    })

    const newTaskItem = document.createElement('p');
    newTaskItem.setAttribute('class', 'todo-item')
    newTaskItem.innerHTML = todoInput.value;
    newTaskArea.appendChild(newTaskItem);
    todoItems.push(newTaskItem.innerHTML);
    uncompleteTodos.push(newTaskItem);
    // タスクの数を数える
    countAll.innerHTML = todoItems.length;
    countUncomplete.innerHTML = uncompleteTodos.length;

    const editButton = document.createElement('button');
    editButton.setAttribute('class', 'edit-button');
    editButton.innerHTML = '編集';
    editButton.setAttribute('onclick', `editTodo(${todoItems.length - 1})`)

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.innerHTML = '削除';
    deleteButton.addEventListener('click', () => {
        deleteTodo(todoItems.length - 1);
    });

    todoItems.forEach((todo, index) => {
        newTaskItem.innerHTML = todo;
        newTaskItem.setAttribute('id', `${index}`);

        newTaskArea.appendChild(editButton);
        newTaskArea.appendChild(deleteButton);
        newTaskArea.setAttribute('id', `todo-${index}`);
        todoArea.appendChild(newTaskArea);
    })

    // todoのidをuncompleteTodoIdsに格納
    const todos = document.getElementsByClassName('todo-item');
    for (i = 0; i < todos.length; i++) {
        uncompleteTodos = [...todos];
    }

    todoInput.value = '';
})


const editTodo = (id) => {
    const todoDiv = document.getElementById(`todo-${id}`);
    const taskItem = document.getElementById(`${id}`);
    const editButton = document.getElementsByClassName('edit-button');
    editButton[id].innerHTML = '保存';
    editButton[id].setAttribute('onclick', `saveTodo(${id})`);
    const editTask = taskItem.innerHTML;

    // 削除ボタンを非表示にする
    const deleteButton = document.getElementsByClassName('delete-button');
    deleteButton[id].style.visibility = 'hidden';

    const editInputArea = document.createElement('input');
    editInputArea.setAttribute('id', 'edit-input')
    editInputArea.value = editTask;
    todoDiv.replaceChild(editInputArea, taskItem);
}

const saveTodo = (id) => {
    const todoDiv = document.getElementById(`todo-${id}`);

    const editInput = document.getElementById('edit-input');
    const newTaskItem = document.createElement('p');
    newTaskItem.setAttribute('class', 'todo-item');
    newTaskItem.setAttribute('id', `${id}`);
    newTaskItem.innerHTML = editInput.value
    todoItems[id] = editInput.value;

    // 非表示にした削除ボタンを表示させる
    const deleteButton = document.getElementsByClassName('delete-button');
    deleteButton[id].style.visibility = 'visible';

    const editButton = document.getElementsByClassName('edit-button');
    editButton[id].innerHTML = '編集';
    editButton[id].setAttribute('onclick', `editTodo(${id})`);

    todoDiv.replaceChild(newTaskItem, editInput);

    // 完了、未完了の配列のタスクを編集
    completeTodos.forEach(todo => {
        if (todo.id === newTaskItem.id) {
            todo.innerHTML = newTaskItem.innerHTML;
            return;
        }
    })
    uncompleteTodos.forEach(todo => {
        if (todo.id === newTaskItem.id) {
            todo.innerHTML = newTaskItem.innerHTML;
            return;
        }
    })
}

const deleteTodo = (id) => {
    if (window.confirm('本当に削除してもよろしいですか?')) {
        // 数取得のために先に要素を取得
        const idElement = document.getElementById(`${id}`);

        todoItems.splice(id, 1);
        const target = document.getElementById(`todo-${id}`);
        todoArea.removeChild(target);

        completeTodos.forEach(todo => {
            if (todo.id === idElement.id) {
                const index = completeTodos.indexOf(todo);
                completeTodos.splice(index, 1);
                return;
            }
        })

        uncompleteTodos.forEach(todo => {
            if (todo.id === idElement.id) {
                const index = uncompleteTodos.indexOf(todo);
                uncompleteTodos.splice(index, 1);
                return;
            }
        })

        countAll.innerHTML = todoItems.length;
        countComplete.innerHTML = completeTodos.length;
        countUncomplete.innerHTML = uncompleteTodos.length;
    }
}
var input = document.querySelector('.todo_input');
var MainTodoContainer = document.getElementById('todos')
var addingButton = document.querySelector('.add-item');
var deleteAllBtn = document.querySelector('.deleteBtn');
var completedButton = document.querySelector('.completed');
var removeButton = document.querySelector('.trash');

addingButton.addEventListener('click', function (e) {
    /* stoping button behaviour */
    e.preventDefault();

    /* Create all the elements */
    if (input.value.trim()) {
        /* UL Tag */
        var ulTag = document.createElement('ul');
        ulTag.classList.add('todo-list-container');
        /* Todo list div */
        var todoList = document.createElement('div');
        todoList.classList.add('todo-list');
        /* LI Tag */
        var liTag = document.createElement('li');
        liTag.innerText = input.value;
        liTag.classList.add('todo-item');
        /* Button Div */
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button');
        /* completed button element1 */
        var completeButton = document.createElement('button');
        completeButton.classList.add('completed');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        /* Edit Button */
        var editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="far fa-edit"></i>';
        editBtn.classList.add('editBtn');
        editBtn.onclick = function () {
            editWorking(liTag);
        }
        /* trash button element2 */
        var trashButton = document.createElement('button');
        trashButton.classList.add('trash');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.onclick = function JSconfirm(e) {

            swal({
                title: "You are deleting this task",

                text: "Are you sure to proceed?",

                type: "warning",

                showCancelButton: true,

                confirmButtonColor: "#DD6B55",

                confirmButtonText: "Yes, Delete this task",

                cancelButtonText: "No, Do not delete",

                closeOnConfirm: false,

                closeOnCancel: false
            },

                function (isConfirm) {
                    if (isConfirm) {
                        swal("All Right !", "The task is deleted", "success");
                        var items = e.target;
                        var todo = items.parentElement;
                        var todo2 = todo.parentElement;
                        todo2.classList.add('fall');
                        todo2.addEventListener('transitionend', function () {
                            var todo3 = todo2.parentElement;
                            todo3.remove();
                        });
                    }
                    else {
                        swal("Hurray", "This task is not deleted", "success");
                        return 0;
                    }
                });

        }

        /* Appending Elements into each other */
        ulTag.appendChild(todoList);
        todoList.appendChild(liTag);
        todoList.appendChild(buttonDiv);
        buttonDiv.appendChild(completeButton);
        buttonDiv.appendChild(editBtn);
        buttonDiv.appendChild(trashButton);

        /* if input is empty then don't display empty list in DOM */
        MainTodoContainer.appendChild(ulTag);

        /* sessionStorage */
        /* when the add button click clear the input value */
        input.value = '';
        /* complete and trash button working */
        todoList.addEventListener('click', function (e) {
            var items = e.target;
            console.log(items)
            if (items.classList[0] === 'completed') {
                var todo = items.parentElement;
                var todo2 = todo.parentElement;
                todo2.classList.add('line_through')
            }
        });
    } else if (input.value === '') {
        alert('Please fill the input field')
    }
});

function editWorking(e) {
    swal({
        title: "You are about to edit this task",

        text: "Are you sure to proceed?",

        type: "warning",

        showCancelButton: true,

        confirmButtonColor: "#DD6B55",

        confirmButtonText: "Yes, Edit this task",

        cancelButtonText: "No, I don't wish to edit",

        closeOnConfirm: true,

        closeOnCancel: false
    },

        function (isConfirm) {
            if (isConfirm) {
                var editValue = prompt('edit the select item', e.firstChild.nodeValue);
                e.firstChild.nodeValue = editValue;
            }
            else {
                swal("Ok !", "This task is unchanged", "success");
                return 0;
            }
        });

}
function deleteAllElements() {
    input.value = '';
}
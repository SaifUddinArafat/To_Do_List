/*########################## Getting The todo List and String to Local Storage ###############################*/

function get_todos(){
    var todos = new Array;//creating a blank todo array
    var todos_str = localStorage.getItem('todoList');//getting existing item stored in localStorage using localStorage.getItem

    //Getting The Todos
    if(todos_str !== null){
        todos = JSON.parse(todos_str); //JSON.parse() convert JSON String of Browser to JavaScript data
    }

    return todos; //return the data from localstorage
}

/*########################## Adding New Item to Todo List ###############################*/

document.getElementById('add').addEventListener('click', add);//Event Listener for Add button
//Function for adding new task
function add(){
    var task = document.getElementById('task').value;
    var todos = get_todos(); //retrive existing todo item from database(localStorage)
    todos.push(task); //append new todo item to database(localStorage)
    localStorage.setItem("todoList", JSON.stringify(todos)) //Saving the new input to the localstorage
    //JSON.stringify enables us to return string from localstorage
    
    clearDefault();
    
    
    show();

    return false; //It adovid any Furthur action created by click event
}

/*########################## Displaying current todo list ###############################*/

function show(){
    var todos = get_todos();

    var html = '';
    for(var i=0; i<todos.length; i++){
        html += 
        `<div class="todo">
            <li class="todo"> 
                ${todos[i]} 
                <button class="remove" id="button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="complete" id="button"><i class="fa fa-check" aria-hidden="true"></i></button>
            </li>
        </div>`; 
    }
    

    document.getElementById('todoList').innerHTML = html;
    
    var buttons = document.getElementsByClassName('remove');
    for(var i=0; i<buttons.length; i++){
        buttons[i].addEventListener('click', remove); //addEventListerner(eventName, Function that would be triggered)
    }

}

show(); //showing the list of Todos stored inside localStorage


/*########################## Cleaning Default Input ###############################*/

function clearDefault(){
    var a = document.getElementById('task'); //getting the input
    a.value = ""; //setting input to null
}


/*########################## Removing Task ###############################*/

function remove(e){
    var todos = get_todos(); //getting the todo list from localStorage
    var item = e.target; //selecting the trash button console.log(item) to check
    if(item.classList[1] == "fa-trash"){
        const todo = item.parentElement; //getting the parent element of item console.log(todo) to check
        const todoitem = todo.parentElement.innerText; //getting the innertext from parent element of todo console.log(todo) to check
        var todoIndex = todos.indexOf(todoitem); //getting the index no of the todoitem that we selected
        
        todos.splice(todoIndex, 1); //removing the item from localStorage using todos.splice() method. console.logtodos.splice(todoIndex, 1); to check
        localStorage.setItem('todoList', JSON.stringify(todos)); //updating localStorage after removing the item through localStorage.setItem() method
    }

    
    show(); //showing the list of Todos stored inside localStorage

    return false; //avoiding any further action after showing the result

}

/*########################## Completed Task ###############################*/

document.getElementById('todoList').addEventListener('click', complete); //Event Listener for complete button
function complete(e){
    var item = e.target;
    if(item.classList[1]=="fa-check"){
        const todo = item.parentElement;
        const todoitem = todo.parentElement;
        todoitem.classList.toggle('completed');
        todoitem.parentElement.classList.toggle('completed'); //for filterTodo Function
    }

}

/*########################## Filter Task ###############################*/

document.getElementById('filterTodo').addEventListener('click', filterTodo); //Event Listener for Filtering Task
function filterTodo(e){
    const todos = document.getElementById('todoList').childNodes; //getting childNodes of todoList console.log(todos) to check

    //todos is child nodes so we can use forEach() method 
    todos.forEach(function(todo){
        //using switch statement to check the selected value
        switch(e.target.value){
            case "all":
            /*for understanding the code console log this item 
                console.log(todo);*/

                todo.style.display = "block"; //link the style sheet and set the value of display:block;
                break;

            case "completed":
            /*for understanding the code console log this item
                console.log(todo.classList);
                console.log(todo.classList.contains('completed'));
            */
                if(todo.classList.contains('completed')){
                    todo.style.display = "block"; //link the style sheet and set the value of display:block;
                }else{
                    todo.style.display = "none"; //link the style sheet and set the value of display:none;
                }
                break;

            case "uncompleted":
                //if the class of the selected item is not equal to 'completed'
                if(todo.classList.contains('completed') == false){
                    todo.style.display = "block"; //link the style sheet and set the value of display:block;
                }else{
                    todo.style.display = "none"; //link the style sheet and set the value of display:none;
                }
                break;
        }
    });
}
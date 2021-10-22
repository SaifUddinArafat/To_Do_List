function get_todos(){
    //creating a blank todo array
    var todos = new Array;

    //getting existing item stored in localStorage using localStorage.getItem
    var todos_str = localStorage.getItem('todoList');

    //getting the todos
    if(todos_str !== null){
        todos = JSON.parse(todos_str); //JSON.parse() convert JSON String of Browser to JavaScript data
    }

    return todos; //return the data from localstorage
}

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

//clearing the input box after adding the task
function clearDefault(){
    var a = document.getElementById('task'); //getting the input
    a.value = ""; //setting input to null
}

//deleting item
function remove(){
    var id = this.getAttribute('id'); //getting id of the item that is clicked to remove
    var todos = get_todos(); //getting the todo list
    todos.splice(id, 1); //removing the item
    localStorage.setItem('todoList', JSON.stringify(todos));
  
    show();

    return false; //avoiding any further action after showing the result
}

//Displaying current todo list
function show(){
    var todos = get_todos();

    var html = '';
    for(var i=0; i<todos.length; i++){
        html += 
        `<div class="todo">
            <li> 
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

document.getElementById('add').addEventListener('click', add);
//document.getElementById('remove').addEventListener('click', remove);


show();

// Selectors
const todoInput = document.getElementById( "todo-input" );
const todoBtn = document.getElementById( "todo-btn" );
const alertText = document.querySelector( ".alert-text" );
const todoList = document.querySelector( ".todo-list" );
const filterTodo = document.getElementById( "filter-todo" );


let todoContainer;
// Check to LocalStorge in TodoContainer
if (localStorage.getItem("TodoList") == null) {
     todoContainer = [];
} else {
     todoContainer = JSON.parse( localStorage.getItem( "TodoList" ) )
     displyTodo()
}

// // Add Todo Function
todoBtn.addEventListener( "click", ( e ) => {

     // Not sending the form
     e.preventDefault()

     // Alert Text
     alertText.innerText = "";

     // Validet Input Empty
     if ( validInput() == false ) {
          alertText.innerText = "Input is Not Valid"
          return false
     }
     // Validet Input Todo Exist
     if ( existValue() == false ) {
          alertText.innerText = "This Value is Already Entered";
          return false
     } else {
          let todoValue = todoInput.value;
          todoContainer.push( todoValue );
          setTodo()
     }

     // Disply Todo Data In innrHtml
     displyTodo()

     // Clear Input Value
     clearInput()

} )

// Clear Input Function
function clearInput() {
     todoInput.value = ""
}

// Validation Todo Input Function
function validInput() {
     if ( todoInput.value == "" ) {
          return false
     } else {
          return true
     }
}

// Exist Value in LocalStroge
function existValue() {

     for ( let i = 0; i < todoContainer.length; i++ ) {
          if ( todoInput.value == todoContainer[ i ] ) {
               return false
          } else {
               return true
          }
     }

}

// SetiTodo in Localstorge
function setTodo() {
     localStorage.setItem( "TodoList", JSON.stringify( todoContainer ) )
}

// Disply Todo Data 
function displyTodo() {

     todos = ``;

     for ( let i = 0; i < todoContainer.length; i++ ) {
          todos += `
          <div class="todo">
          <li class="todo-item">${todoContainer[i]}</li>
          <button onclick="compelet(${i})" class="check"> <i class="fas fa-check-square"></i> </button>
          <button onclick="deleteTodo(${i})" class="trash"> <i class="fas fa-trash-alt"></i> </button>
          </div>
          `
     }
     document.querySelector( ".todo-list" ).innerHTML = todos;
}


// Delete Todo Item
function deleteTodo( i ) {
     todoContainer.splice( i, 1 );
     displyTodo()
     setTodo()
}

// Compelet Todo Item
function compelet(i) {
     const compeletBtn = document.querySelectorAll( ".check" );
     const todo = document.querySelectorAll( ".todo" );
     compeletBtn[ i ].classList.toggle( "copmlete-btn" )
     
     if ( compeletBtn[ i ].classList.contains( "copmlete-btn" ) == true ) {
          todo[i].classList.add( "copmlete" );
     } else {
          todo[i].classList.remove( "copmlete" );
     }

}

// Filter Todo List
filterTodo.addEventListener( "click", ( e ) => {
     

     const todos = Array.from(todoList.children)

     console.log(todos)
     todos.forEach( ( todoEl )=> {
          switch ( e.target.value ) {
               case "all":
                    todoEl.style.display = "flex"
                    break;

               case "completed":
                    if ( todoEl.classList.contains( "copmlete" ) ) {
                         todoEl.style.display = "flex"
                    } else {
                         todoEl.style.display = "none"
                    }
                    break;
               case "uncompleted":
                    if ( todoEl.classList.contains( "copmlete" ) ) {
                         todoEl.style.display = "none"
                    } else {
                         todoEl.style.display = "flex"
                    }
                    break;
          }
     } )

})


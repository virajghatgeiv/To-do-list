window.addEventListener("load",() =>{

  todos =JSON.parse(localStorage.getItem("todos")) || [];
 const form = document.querySelector("#new-task-form");
 const input = document.querySelector("#new-task-input");

 form.addEventListener("submit",e =>{
  e.preventDefault();
  
  if(!e.target.elements.content.value){
    alert("Please enter some task it can't be blank !");
    return;
  }else{
    const task ={
        content: e.target.elements.content.value,
        createdAt: new Date().getTime()
      }

      todos.push(task);
      localStorage.setItem("todos",JSON.stringify(todos));
      e.target.reset();
      DisplayTodos();
     }
   });
    DisplayTodos();
});

function DisplayTodos(){
  const list_el = document.querySelector("#tasks");

  list_el.innerHTML = "";

  todos.forEach(todo => {
  const task_el =document.createElement("div");
  task_el.classList.add("task");

  const task_content_el = document.createElement("div");
  task_content_el.classList.add("content");
  
  const task_input_el = document.createElement("input");
  task_input_el.classList.add("text");
  task_input_el.type = "text";
  task_input_el.value = todo.content ;
  task_input_el.setAttribute("readonly","readonly");


  const task_actions_el = document.createElement("div");
  task_actions_el.classList.add("actions");

  const task_edit_el = document.createElement("button");
  task_edit_el.classList.add("edit");
  task_edit_el.innerHTML = "Edit";

  const task_delete_el = document.createElement("button");
  task_delete_el.classList.add("delete");
  task_delete_el.innerHTML = "Delete";

  task_content_el.appendChild(task_input_el);
  task_actions_el.appendChild(task_edit_el);
  task_actions_el.appendChild(task_delete_el);
  task_el.appendChild(task_content_el);
  task_el.appendChild(task_actions_el);
  list_el.appendChild(task_el);

  task_edit_el.addEventListener("click", e => {
   const input = task_content_el.querySelector("input");
   input.removeAttribute("readonly");
   input.focus();
   input.addEventListener("blur",(e) =>{
    console.log(input.value);
    if(!input.value){
      alert("Please enter some task it can't be blank !");
      return;
    }else{
    input.setAttribute("readonly",true);
    todo.content = e.target.value;
    localStorage.setItem("todos",JSON.stringify(todos));
    DisplayTodos();
    }
    
   });
   
  });

  task_delete_el.addEventListener("click",() =>{
    todos = todos.filter(t => t != todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    DisplayTodos();
   });

  });
}
// Define UI vars 

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInupt = document.querySelector('#task');


// Load all event listeners 

loadEventListeners();

// Load all event listeners 

function loadEventListeners(){
  // DOM load event 
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task 
  form.addEventListener('submit', addTask);
  //remove item 
  taskList.addEventListener('click', removeTask);
  // clear task 
  clearBtn.addEventListener('click', clearTasks);
  //filter task 
  filter.addEventListener('keyup', filterTasks);

}

// Get Tasks 

function getTasks(){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }


  tasks.forEach(function(task){
        // create li element 
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    // create text node and append to li 
  
    li.appendChild(document.createTextNode(task));
    // creat new link element 
    const link = document.createElement('a');
    
    link.className = 'delete-item secondary-content';

    //add icon html 

    link.innerHTML = '<i class="fas fa-times"></i>';
    li.appendChild(link);

    // append li to ul 

    taskList.appendChild(li);
  });
}

//add Task 

function addTask(e){
  if(taskInupt.value === '')
  {
    alert('Add a Task');
  }
  // create li element 
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  // create text node and append to li 
 
  li.appendChild(document.createTextNode(taskInupt.value));
  // creat new link element 
  const link = document.createElement('a');
  
  link.className = 'delete-item secondary-content';

  //add icon html 

  link.innerHTML = '<i class="fas fa-times"></i>';
  li.appendChild(link);

  // append li to ul 

  taskList.appendChild(li);


  // store in LS 
  storeTaskInLocalStorage(taskInupt.value);

  taskInupt.value = '';

  e.preventDefault();
}


// Store Task

function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task

function removeTask(e){

  if(e.target.parentElement.classList.contains('delete-item')){

    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    // Remove from LS 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

  }
}


// Remove from LS 

function removeTaskFromLocalStorage(taskItem){

  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear Tasks

function clearTasks(){
  //taskList.innerHTML = '';

  // Faster
   while(taskList.firstChild)
   {
     taskList.removeChild(taskList.firstChild);
   }

   // Clear from LS 
   clearTasksFromLocalStorage();
}

// Clear from LS 

function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if(item.toLocaleLowerCase().indexOf(text) != -1){
        task.style.display = 'block';

      }else{
        task.style.display = 'none';
      }
    }
  );
  
}



var uid = new ShortUniqueId();
// variables
let colors = ["pink", "blue", "green", "black"];

let defaultcolor = "black";
let cfilter = "";
let locked = false;
let islocked = false;

let deletemode=false;
//elements
let input = document.querySelector(".task_input");
let maincontainer = document.querySelector(".main-container");
let colorContainer = document.querySelector(".color-group-container");
let lockContainer=document.querySelector(".lock-container");
let unlockContainer=document.querySelector(".unlock-container");
let pluscontainer=document.querySelector(".plus-container");
let mutliplycontainer=document.querySelector(".multiply-container");
let deletecontainer = document.querySelector(".multiply-container");

//checking if any task is present in local storage-> bring it to ui


//event listners
input.addEventListener("keydown", function (e) {
  if (e.code == "Enter" && input.value) {
    console.log("task value", input.value);
    let id = uid();
    createTask(id, input.value, true);
    input.value = "";
  }
});

// filtering tasks acc to color
colorContainer.addEventListener("click", function (e) {
  let element = e.target;
  console.log("e.target", element);
  if (element != colorContainer) {
    let filteredCardColor = element.classList[1];
    filterCards(filteredCardColor);
  }
});

lockContainer.addEventListener("click", function (e) {
    let numberofelements =document.querySelectorAll('.task_main-container>div');
    for(let i = 0 ; i< numberofelements.length;i++){
      numberofelements[i].contentEditable=false;
    }
    lockContainer.classList.add("active");
    unlockContainer.classList.remove("active");
    
});

unlockContainer.addEventListener("click", function (e) {
    let numberofelements = document.querySelectorAll(".task_main-container>div");
    for (let i = 0; i < numberofelements.length; i++) {
      numberofelements[i].contentEditable = true;
    }
    lockContainer.classList.remove("active");
    unlockContainer.classList.add("active");
})

// implementing deleting the containers
deletecontainer.addEventListener("click", function (e) {
  deletemode=!deletemode;
    if(deletemode==true){
        deletecontainer.classList.add("active");
    }else{
       deletecontainer.classList.remove("active");
    }
})

//helpers
function createTask(id, task, flag,color) {
  let taskcontainer = document.createElement("div");
  taskcontainer.setAttribute("class", "task-container");
  maincontainer.appendChild(taskcontainer);
  taskcontainer.innerHTML = `
        <div class="task-header ${color?color:defaultcolor}"></div>
        <div class="task_main-container">
        <h3 class="task-id">#${id}</h3>
        <div class="text" contentEditable="true">${task}</div>
        </div>`;

  //add event listner for color change
  let taskheader = taskcontainer.querySelector(".task-header");
  let mainTask = taskcontainer.querySelector(".task_main-container>div")
  
  let nextcolor;
  // color change
  taskheader.addEventListener("click", function () {
    let cColor = taskheader.classList[1];
    // console.log(cColor);
    let idx = colors.indexOf(cColor);
    let nextidx = (idx + 1) % 4;
    nextcolor = colors[nextidx];
    
    taskheader.classList.remove(cColor);
    taskheader.classList.add(nextcolor);
    let idElem=taskheader.parentNode.children[1].children[0];// taskheader->task-container->main-taskContainer->task-id.
    let id=idElem.textContent;
    id=id.split('#')[1];
    
    let taskString = localStorage.getItem("tasks");
    let tasksArr = JSON.parse(taskString);
    // let taskObject = {
    //   id: id,
    //   task: task,
    //   color: defaultcolor,
    // };
    // tasksArr.push(taskObject);
    
    for(let i =0;i<tasksArr.length;i++){
      if(tasksArr[i].id==id){
        tasksArr[i].color=nextcolor;
        break;
      }
    }
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
    
  });
  // code for delete mode
  taskcontainer.addEventListener("click", function (e) {
    if(deletemode==true){
      let id=taskcontainer.querySelector('.task-id').textContent;
      taskcontainer.remove();
      let taskString= localStorage.getItem("tasks");
      let tasksArr= JSON.parse(taskString);
      // let id=taskcontainer.querySelector('task-id').textContent;
      id=id.split('#')[1];
      // search on the basis of id
      
      for(let i = 0 ; i < tasksArr.length ; i++){
          if(tasksArr[i].id==id){
            tasksArr.splice(i,1);
            // tasksArr[i].remove();
            break;
          }
      } 
      localStorage.setItem("tasks", JSON.stringify(tasksArr));
    }
  })
  
  mainTask.addEventListener("blur", function (e) {
    let content=mainTask.textContent;
    let tasksString= localStorage.getItem("tasks");
    let tasksArr= JSON.parse(tasksString);
    for(let i = 0 ; i<tasksArr.length; i++){
      if(tasksArr[i].id==id){
          tasksArr[i].task=content;
          break;
      }
    }
    localStorage.setItem("tasks",JSON.stringify(tasksArr));
  })


  //loacl storage adding
  if(flag==true){
  let taskString = localStorage.getItem("tasks");
  let tasksArr = JSON.parse(taskString) || [];
  let taskObject = {
    id: id,
    task: task,
    color: defaultcolor,
  };
  tasksArr.push(taskObject);
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }
}

// localStorage.clear()  // to clear all the tasks in the local storage

function filterCards(filtercolor) {
  let alltaskcards = document.querySelectorAll(".task-container");
  if (cfilter != filtercolor) {
    for (let i = 0; i < alltaskcards.length; i++) {
      let taskheader = alltaskcards[i].querySelector(".task-header");
      let taskcolor = taskheader.classList[1];
      if (taskcolor == filtercolor) {
        //show
        alltaskcards[i].style.display = "block";
      } else {
        //hide
        alltaskcards[i].style.display = "none";
      }
    }
    cfilter = filtercolor;
  } else {
    cfilter = "";
    for (let i = 0; i < alltaskcards.length; i++) {
      alltaskcards[i].style.display = "block";
    }
  }
}

(function(){
    let tasks= JSON.parse(localStorage.getItem("tasks")) || [];
    for(let i= 0 ; i < tasks.length; i++) {
      let {id,task,color}=tasks[i];
      createTask(id,task,false,color);//false bcz here we are not gona create new task , we are bringing prev added tasks to ui
    }
})()

// let selectedDelete = document.querySelector(".multiply-container");
// selectedDelete.addEventListener("click",function (e){
    
// })

// lock/ unlock features




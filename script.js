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

//event listners
input.addEventListener("keydown", function (e) {
  if (e.code == "Enter" && input.value) {
    console.log("task value", input.value);
    let id = uid();
    createTask(id, input.value);
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
function createTask(id, task) {
  let taskcontainer = document.createElement("div");
  taskcontainer.setAttribute("class", "task-container");
  maincontainer.appendChild(taskcontainer);
  taskcontainer.innerHTML = `
        <div class="task-header ${defaultcolor}"></div>
        <div class="task_main-container">
        <h3 class="task-id">#${id}</h3>
        <div class="text" contentEditable="true">${task}</div>
        </div>`;

  //add event listner for color change
  let taskheader = taskcontainer.querySelector(".task-header");
  taskheader.addEventListener("click", function () {
    let cColor = taskheader.classList[1];
    // console.log(cColor);
    let idx = colors.indexOf(cColor);
    let nextidx = (idx + 1) % 4;
    let nextcolor = colors[nextidx];
    taskheader.classList.remove(cColor);
    taskheader.classList.add(nextcolor);
  });
  // code for delete mode
  taskcontainer.addEventListener("click", function (e) {
    if(deletemode==true){
      taskcontainer.remove();
    }
  })
}



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


// lock/ unlock features




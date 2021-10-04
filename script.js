var uid = new ShortUniqueId();


let input = document.querySelector(".task_input");
let maincontainer = document.querySelector(".main-container");
let colors = ["pink", "blue", "green", "black"];
let defaultcolor = "black";
let cfilter = "";
input.addEventListener("keydown", function (e) {
  if (e.code == "Enter" && input.value) {
    console.log("task value", input.value);
    let id = uid();
    createTask(id, input.value);
    input.value = "";
  }
});

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
}

// filtering tasks acc to color
let colorContainer = document.querySelector(".color-group-container");
colorContainer.addEventListener("click", function (e) {
  let element = e.target;
  console.log("e.target", element);
  if (element != colorContainer) {
    let filteredCardColor = element.classList[1];
    filterCards(filteredCardColor);
  }
});

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

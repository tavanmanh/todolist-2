let input =document.getElementById("new");
let taskName=document.querySelector('#new')

let tasks=getTasks()
renderTask(tasks)

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if(!taskName.value){
            alert("PLEASE ADD TASk")
            return false
        }
        let taskId=this.getAttribute('id')
        let tasks=getTasks()
        let task ={name:taskName.value,status: 0 }
        if(taskId==0 || taskId){
            tasks[taskId]= task
            this.removeAttribute('id')
        }
        else{
        tasks.push(task)
        }
        taskName.value=''
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(tasks)
    }
  })

function editTask(id){
    let tasks=getTasks()
    taskName.value=tasks[id].name
    btnAdd.setAttribute('id',id)
}
function deleteTask(id){
        let tasks=getTasks()
        tasks.splice(id,1)
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(getTasks())
}
function renderTask(tasks=[]){
    let content='<ul class="todo-list">'
    tasks.forEach((task,index) =>{
        if(task.status==1){
            completed='checked'
        }
        else{
            completed=''
        }
        content +=`<li class="completed">
        <div class="view">
            <input onclick="updateStatus(${index})" class="toggle" type="checkbox" ${completed}>
            <label >${task.name}</label>
            <a class="destroy" href="#" onclick="deleteTask(${index})"></a>
        </div>
        <input class="edit" value="Rule the web">
    </li>`
    document.querySelector('.todo-count').innerHTML=tasks.length+" item left"
    })
    content+='</ul>'
    document.querySelector('.main').innerHTML=content
}
let clearComplete = document.querySelector('.clear-completed')

let comp=document.querySelector('.comp')
let active=document.querySelector('.active')
let all=document.querySelector('.all')
active.addEventListener('click',function(){
    let tasks=getTasks()
    let tasksActive=[]
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].status==0){
        tasksActive.push(tasks[i])
        }
    }
    renderTask(tasksActive)
})
comp.addEventListener('click',function(){
    console.log("comp")
    let tasks=getTasks()
    let tasksComp=[]
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].status==1){
            tasksComp.push(tasks[i])
        }
    }
    renderTask(tasksComp)
})
all.addEventListener('click',function(){
    let tasks=getTasks()
    renderTask(tasks)
})
function getTasks(){
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) :[]
}
function updateStatus(id) {
    let tasks=getTasks()
     if(tasks[id].status==0){
        tasks[id].status=1
        }
        else{
            tasks[id].status=0
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))
        renderTask(getTasks())
  
}
clearComplete.addEventListener('click',function(){
    console.log("click")
    let tasks=getTasks()
    tasks.splice(0,tasks.length)
    localStorage.setItem('tasks',JSON.stringify(tasks))
    renderTask(getTasks())
});
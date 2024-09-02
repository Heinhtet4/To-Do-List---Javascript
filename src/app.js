const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const listGroup = document.querySelector("#listGroup");
const doneTask = document.querySelector("#doneTask");
const taskTotal = document.querySelector("#taskTotal");


const addList = () => {
    //call createNewList Function and mount to group list
    if(taskInput.value !== ""){
        listGroup.append(createNewList(taskInput.value));
    }
    // call count and update total task List
    updateTaskTotal();
    // clear input form after click add button
    taskInput.value = "";
}


//process
// List Generate Function
const createNewList = (currentTask) => {
    const list = document.createElement("div");
    list.classList.add("list");
    list.innerHTML = `
    <div class="border-[1.5px] flex p-3 justify-between hover:bg-slate-200 transition-colors duration-300 cursor-pointer mb-2">
                        <div class="flex items-center gap-x-3">
                            <input type="checkbox" class="list-done-check accent-slate-700">
                            <p class="font-semibold font-mono list-task">${currentTask}</p>
                        </div>
                        <div>
                            <button class="border-[1.5px] border-slate-700 size-8 hover:bg-slate-700 duration-300 group rounded-sm list-edit-btn">
                                <i class="ri-edit-box-line text-slate-700 group-hover:text-slate-100 text-lg"></i>
                            </button>
                            <button class="border-[1.5px] border-red-700 size-8 hover:bg-red-700 duration-300 group rounded-sm list-delete-btn">
                                <i class="ri-delete-bin-line text-red-700 group-hover:text-slate-100 text-lg"></i>
                            </button>
                        </div>
                    </div>
    `;
    const listDoneCheck = list.querySelector(".list-done-check");
    const listTask = list.querySelector(".list-task")
    listDoneCheck.addEventListener("change",() => {
        updateDoneTaskTotal();
        listTask.classList.toggle("line-through");
        list.classList.toggle("opacity-50");
        list.classList.toggle("scale-[0.9]");
        if(listDoneCheck.checked){
            listEditBtn.setAttribute("disabled",true);
        }else{
            listEditBtn.removeAttribute("disabled",true);
        }
    });
    const listDeleteBtn = list.querySelector(".list-delete-btn");
    listDeleteBtn.addEventListener("click", () => {
        list.remove();
        updateTaskTotal();
        updateDoneTaskTotal();
    });
    const listEditBtn = list.querySelector(".list-edit-btn");
    listEditBtn.addEventListener("click",() => {
        listTask.classList.add("hidden");
        const newEditInput = document.createElement("input");
        newEditInput.className = "border border-[1.5px] outline-none px-1 w-[160px]";
        newEditInput.value = listTask.innerHTML;
        listTask.after(newEditInput);
        newEditInput.focus();
        listEditBtn.setAttribute("disabled",true)
        newEditInput.addEventListener("change",() => {
            listTask.innerHTML = newEditInput.value;
            newEditInput.classList.add("hidden");
            listTask.classList.remove('hidden');
            listEditBtn.removeAttribute("disabled",true);
        })
    });
    return list;
}
// Update and count Task Total Function
const updateTaskTotal = () => {
    // Count Task Total
    taskTotal.innerText = document.querySelectorAll(".list").length;
}
// Update and count Done Task Total Function
const updateDoneTaskTotal = () => {
    doneTask.innerText = document.querySelectorAll(".list input:checked").length;
}


addTaskBtn.addEventListener("click",addList)
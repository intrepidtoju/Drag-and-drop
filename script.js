const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const todoList = [
    'Take a bath',
    'Take breakfast',
    'Write some codes',
    'Take a walk',
    'Write more codes',
    'Take lunch',
    'Read a Book',
    'Take a Break',
    'Listen to the News',
    'Rest'
];

const listItems = [];

let dragStartIndex;

createList();

function createList(){
    [...todoList]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((task, index) => {
            const listItem = document.createElement('li');

            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                <span class="number">${index +1}</span>
                <div class="draggable" draggable="true">
                    <p class="task-name">${task}</p>
                    <i class="fas fa-grip-lines"></i>
                </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
        });
        addEventListeners();
}

function dragStart(){
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e){
    e.preventDefault();
}
function dragDrop(){
    dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}
function dragEnter(){
    this.classList.add('over');
}
function dragLeave(){
    this.classList.remove('over');
}

function checkOrder() {
   listItems.forEach((listItem, index) => {
       const taskName = listItem.querySelector('.draggable').innerText.trim();

       if (taskName !== todoList[index]) {
           listItem.classList.add('wrong');
       }else {
           listItem.classList.remove('wrong');
           listItem.classList.add('right');
       }
   }); 
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItem = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    })
    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}
check.addEventListener('click', checkOrder);
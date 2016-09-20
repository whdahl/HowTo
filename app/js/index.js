const MAXSTEPS = 15;

class Task{
    constructor(title, step){
        this.title = title;
        this.step = step;
    }
}

var index = 1;
var stepList = {};
var newHowTo;
var database = window.sessionStorage;

document.addEventListener(
    'DOMContentLoaded',
    init,
    false
);

function init(){
    document.querySelector('#newButton').addEventListener('click', newTask/*showScreen.bind(null,'newHowTo')*/);
    document.querySelector('#cancel').addEventListener('click', showScreen.bind(null, 'main'));
    document.querySelector('#finished').addEventListener('click', finished);
    document.querySelector('#newStepButton').addEventListener('click', newStep);
    document.querySelector('#clear').addEventListener('click', clearAll);
    newHowTo = document.querySelector('#newHowTo');

    showScreen('main');
}

function newTask(){
    showScreen('newHowTo');
}

function hideScreens(){
    document.querySelector('#newHowTo').style.display='none';
    document.querySelector('#main').style.display='none';
}

function showScreen(id){
    hideScreens();
    document.querySelector('#'+id).style.display='block';
}

function newStep(){
    if((index + 1) <= MAXSTEPS){
        var input = document.createElement('input');
        input.type = 'text';
        input.id = 'stepInfo' + (index + 1);
        input.className = 'newStep';
        input.placeholder = 'Step ' + (index + 1);
        input.style.left = 20 + '%';
        input.style.top = 20+(index*10)+'%';
        console.log(input.style.top);
        newHowTo.appendChild(input);
        //index++;

        if(document.querySelector('#stepInfo' + (index) != null)){
            var stepInfo = document.querySelector('#stepinfo' + (index)).value;
        }
        index++;
    }
    else{
        alert('Limit of ' + MAXSTEPS + ' steps.')
    }
}

function finished(){
    var title = document.querySelector('#taskTitle').value;

    for(var i = 1; i <= MAXSTEPS; i++)
    {
        var x = document.querySelector('#stepInfo' + i).value;
        stepList[i] = x;
        if(document.querySelector('#stepInfo' + (i+1)) == null){
            console.log(i + ' steps, terminating loop');
            i = MAXSTEPS + 1;
        }
    }

    var task = new Task(title, stepList);
    //console.log(task);

    database.setItem(title, JSON.stringify(task));
    console.log(JSON.parse(database.getItem(title)));
    clearAll();
    showScreen('main');
}

function clearAll(){
    var newHowTo = document.querySelector('#newHowTo');
    var x = document.querySelector('#stepInfo1');
    x.value = '';
    do{
        if(index > 1){
            x = document.querySelector('#stepInfo' + index);
            if(x != null){
                x.value = '';
                newHowTo.removeChild(x);
                index--;
            }

            x = document.querySelector('#stepInfo' + index);
        }
    }
    while(index > 1)
    document.getElementById('taskTitle').value = '';
    index = 1;
}

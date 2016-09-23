const MAXSTEPS = 10;

class Task{
    constructor(title, step){
        this.title = title;
        this.step = step;
    }
}

var index = 1;
var taskCount = 0;
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
    document.querySelector('#search').addEventListener('click', search);
    newHowTo = document.querySelector('#newHowTo');

    showScreen('main');
    console.log(Object.keys(database).length);
    var results = Object.keys(database);
    for(var i = 0; i < Object.keys(database).length; i++){
        updateRecentTasks(results[i]);
    }
}

function newTask(){
    if(document.querySelector('#resultsBubble') !== null){
        var main = document.querySelector('#main');
        main.removeChild(document.querySelector('#resultsBubble'));
    }
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
    var ul;

    if(index == 1){
        ul = document.createElement('ul');
        ul.setAttribute('id', 'stepListul');

        newHowTo.appendChild(ul);
    }

    if((index + 1) <= MAXSTEPS){
        var newStep = document.createElement('input');
        newStep.type = 'text';
        newStep.id = 'stepInfo' + (index + 1);
        newStep.className = 'newStep';
        newStep.placeholder = 'Step ' + (index + 1);
        newStep.style.position = 'absolute';
        newStep.style.left = 20 + '%';
        newStep.style.top = 10+(index*10)+'%';

        newHowTo.appendChild(newStep);

        index++;
    }
    else{
        alert('Limit of ' + MAXSTEPS + ' steps.')
    }
}

function search(){
    if(document.querySelector('#taskBubble') != null){
        document.querySelector('#main').removeChild(document.querySelector('#taskBubble'));
    }
    var query = document.querySelector('#searchBar').value;

    if(query.length == 0){
        return;
    }

    if(document.querySelector('#resultsBubble') != null){
        var main = document.querySelector('#main');
        main.removeChild(document.querySelector('#resultsBubble'));
    }
    var results = {};
    var resultsIndex = 0;
    var keys = Object.keys(database);

    for(var keynum = 0; keynum < Object.keys(database).length; keynum++){
        if(keys[keynum].indexOf(query) !== -1){
            results[resultsIndex] = keys[keynum];
            resultsIndex++;
        }
    }
    displayResults(results);
}

function displayResults(list){
    showScreen('main');

    var main = document.querySelector('#main');

    var resultsBubble = document.createElement('div');
    resultsBubble.id = 'resultsBubble';

    var closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.id = 'closeButton';
    closeButton.onclick = function(){main.removeChild(resultsBubble);};

    var ul = document.createElement('ul');
    ul.id = 'resultsList';


    for(var i = 0; i < Object.keys(list).length; i++){
        var li = document.createElement('li');
        var button = document.createElement('button');
        var item = list[i];

        button.id = 'whatever';
        button.innerHTML = list[i];


        //holy shit this worked
        button.onclick = displayTask.bind(null, item);

        li.appendChild(button);
        ul.appendChild(li);
        //resultsBubble.appendChild(ul);
    }
    resultsBubble.appendChild(ul);
    resultsBubble.appendChild(closeButton);
    main.appendChild(resultsBubble);
}

function finished(){
    var title = document.querySelector('#taskTitle').value;

    if(title.length == 0){
        alert('You must give your task a title');
        return;
    }

    for(var i = 1; i <= MAXSTEPS; i++)
    {
        var x = document.querySelector('#stepInfo' + i).value;
        console.log(x.length);
        if(x.length == 0){
            alert('Step ' + i + ' can not be blank');
            i = 1;
            return;
        }
        stepList[i] = x;
        if(document.querySelector('#stepInfo' + (i+1)) == null){
            console.log(i + ' steps, terminating loop');
            i = MAXSTEPS + 1;
        }
    }

    var task = new Task(title, stepList);

    database.setItem(title, JSON.stringify(task));
    updateRecentTasks(title);



    clearAll();
    showScreen('main');
}

function updateRecentTasks(title){
    var recent = document.querySelector('#recentTasks');
    var recentTaskButton = document.createElement('button');
    recentTaskButton.innerHTML = title;
    recentTaskButton.id = 'recentTaskButton';
    recentTaskButton.onclick = function(){displayTask(title);};
    //recent.appendChild(recentTaskButton);
    recent.insertBefore(recentTaskButton, recent.childNodes[1]);
}

function displayTask(name){

    var main = document.querySelector('#main');
    if(document.querySelector('#resultsBubble') !== null){
        main.removeChild(document.querySelector('#resultsBubble'));
    }
    var oldTask = document.querySelector('#taskBubble')
    if(oldTask != null){
        main.removeChild(oldTask);
    }

    var taskBubble = document.createElement('div');
    taskBubble.id = 'taskBubble';

    var closeButton = document.createElement('button');
    closeButton.innerHTML = 'X';
    closeButton.id = 'closeButton';
    closeButton.onclick = function(){main.removeChild(taskBubble);};


    var ol = document.createElement('ol');
    ol.id = 'taskList';
    ol.innerHTML = name;

    var _task = JSON.parse(database.getItem(name));
    var keycount = Object.keys(_task.step).length;
    for(var keynum = 1; keynum <= keycount; keynum++){
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(_task.step[keynum]));
        ol.appendChild(li);
    }

    taskBubble.appendChild(ol);
    taskBubble.appendChild(closeButton);
    main.appendChild(taskBubble);
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

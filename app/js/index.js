document.addEventListener(
    'DOMContentLoaded',
    init,
    false
);

var task = {
    name: '',
    step: {
        index: 1,
        description: ''
    }
}

function init(){
    document.querySelector('#newButton').addEventListener('click', showScreen.bind(null,'newHowTo'));
    document.querySelector('#cancel').addEventListener('click', showScreen.bind(null, 'main'));
    document.querySelector('#finished').addEventListener('click', finished);
    document.querySelector('#newStep').addEventListener('click', newStep);
    document.querySelector('#clear').addEventListener('click', clearAll);

    showScreen('main');
}

function hideScreens(){
    document.querySelector('#newHowTo').style.display='none';
    document.querySelector('#main').style.display='none';
}

function showScreen(id){
    hideScreens();
    document.querySelector('#'+id).style.display='block';
}

function finished(){
    task.name = document.getElementById('taskTitle').value;
    console.log(task.name);
}

function clearAll(){
    var newHowTo = document.getElementById('newHowTo');
    x = document.getElementsByClassName('newStep');
    console.log(x.length);
    console.log(x);
    for(var i = 0; i < x.length; i++)
    {
        x.value = ''
        newHowTo.removeChild(x[i]);
    }
    document.getElementById('taskTitle').value = '';
}

function newStep(){
    //console.log('newStep');
    var input = document.createElement('input');
    input.id = 'stepInfo' + task.step.index;
    input.className = 'newStep';
    //console.log(input);
    var newHowTo = document.getElementById('newHowTo');
    newHowTo.appendChild(input);
    task.step.description = document.getElementById('stepInfo'+task.step.index).value;
    task.step.index++;
    console.log(task.step.description);
    //console.log(task);
}

document.addEventListener(
    'DOMContentLoaded',
    init,
    false
);

function init(){
    document.querySelector('#newButton').addEventListener('click', showScreen.bind(null,'newHowTo'));
    document.querySelector('#cancel').addEventListener('click', showScreen.bind(null, 'main'));
    document.querySelector('#finished').addEventListener('click', finished);
    document.querySelector('#newStep').addEventListener('click', newStep);

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

}

function newStep(){
    
}

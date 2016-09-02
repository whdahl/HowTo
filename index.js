const remote = require('electron').remote;

var Button1 = document.createElement('button');
/*Button1.textContent = 'How To...';
Button1.id = 'HowToButton1';
Button1.classname = 'button';*/
Button1.addEventListener('click', ()=>{
    //add new how to page
}, false);

//var t = document.createTextNode('ClickMe');
//Button1.appendChild(t);


document.body.appendChild(Button1);


const electron = require('electron');
const {app, BrowserWindow} = electron;

//var cards = require('./cards.js');

//cardDeck = cards;

app.on('ready', () => {
  let win = new BrowserWindow({width:1500, height: 1100})
  win.loadURL(`file://${__dirname}/index.html`)
  win.webContents.openDevTools()
})

/*var cardDeck = cards.listCards();
//console.log(cardDeck);

function shuffleDeck(){
    console.log('shuffle button clicked');
    var currentIndex = cardDeck.length, temporaryValue, randomIndex;

    while(0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        console.log('randomIndex: ', randomIndex, ' currentIndex: ', currentIndex);
        currentIndex -= 1;

        temporaryValue = cardDeck[currentIndex];
        console.log('temporaryValue: ', temporaryValue);
        cardDeck[currentIndex] = cardDeck[randomIndex];
        cardDeck[randomIndex] = temporaryValue;
    }
    for(var i = 0; i < cardDeck.length; i++){
        //console.log(cardDeck[i]);
    }
    return cardDeck;
}

function dealCards(deck){
    return;
}

exports.shuffleDeck = shuffleDeck;
exports.dealCards = dealCards;*/

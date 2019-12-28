import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  deck = ['2C.png', '3C.png', '4C.png', '5C.png', '6C.png', '7C.png','8C.png', '9C.png', '10C.png', 'AC.png', 'JC.png', 'QC.png', 'KC.png',
  '2D.png', '3D.png', '4D.png', '5D.png', '6D.png', '7D.png','8D.png', '9D.png', '10D.png', 'AD.png', 'JD.png', 'QD.png', 'KD.png',
  '2H.png', '3H.png', '4H.png', '5H.png', '6H.png', '7H.png','8H.png', '9H.png', '10H.png', 'AH.png', 'JH.png', 'QH.png', 'KH.png',
  '2S.png', '3S.png', '4S.png', '5S.png', '6S.png', '7S.png','8S.png', '9S.png', '10S.png', 'AS.png', 'JS.png', 'QS.png', 'KS.png']; 

  setOfCards = this.generateCardSet();
  firstSetOfCards = this.constructCardObject(this.setOfCards);
  shuffleCards = this.shuffleSetOfCards(this.setOfCards);
  firstSetOfCardsShuffled =  this.constructCardObject(this.shuffleCards);

  flippCounter = 0;
  prevFlippId;
  @Output() scoreObj = new EventEmitter<Object>();
  score = {unmatchedFlips: 0, matchedFlips: 0}
  constructor() { }

  generateCardSet() {
    var current = this.deck.length, temp, rand;
    while (0 !== current) {
      rand = Math.floor(Math.random() * current);
      current -= 1;
      temp = this.deck[current];
      this.deck[current] = this.deck[rand]
      this.deck[rand] = temp
    }
    return this.deck.slice(0,6);
  }

  constructCardObject(setOfCard) {
    var obj = []
    for (var i=0; i<setOfCard.length; i++ ) {
      obj[i] = {id: setOfCard[i].slice(0,3).replace('.', ''), isFlipped: false, imgUrl: setOfCard[i]}
    }
    return obj;
  }

  shuffleSetOfCards(setOfCards) {
    var current = setOfCards.length, temp, rand;
    while (0 !== current) {
      rand = Math.floor(Math.random() * current);
      current -= 1;
      temp = setOfCards[current];
      setOfCards[current] = setOfCards[rand]
      setOfCards[rand] = temp
    }
    return setOfCards;
  }

  reset() {
    var x;
    return x;
  }


 async handleCard(card) { 
    card.isFlipped = true;
    this.flippCounter++;

    if (!this.prevFlippId) {
      this.prevFlippId = card.id;
      return;
    } 
    if (this.flippCounter > 2) {
      this.prevFlippId = this.reset();
      for (var i = 0; i < this.firstSetOfCards.length; i++) {
        if (this.firstSetOfCards[i].isFlipped)
          this.firstSetOfCards[i].isFlipped = false;
        if (this.firstSetOfCardsShuffled[i].isFlipped)
          this.firstSetOfCardsShuffled[i].isFlipped = false;
      }
      this.score.unmatchedFlips++;
      this.scoreObj.emit(this.score)
      this.flippCounter = 0;
    }

    if (this.prevFlippId == card.id) {
      card.isFlipped = true;
      this.score.matchedFlips++;
      this.scoreObj.emit(this.score)
      await setInterval( () => {
        for (var i=0; i < this.firstSetOfCards.length; i++) {
          if (card.id == this.firstSetOfCards[i].id)
            this.firstSetOfCards.splice(i,1);
          if (card.id == this.firstSetOfCardsShuffled[i].id) 
            this.firstSetOfCardsShuffled.splice(i,1);
        }
      },1000)
      return;
      }
  }
  ngOnInit() {
  }

}

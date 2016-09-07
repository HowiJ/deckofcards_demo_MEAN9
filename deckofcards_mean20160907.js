//Deck of Cards: MEAN September 2016
//Deck constructor
function Deck () {
    //array of Cards
    this.cards = [];
}
//reset deck
Deck.prototype.reset = function () {
    var suit = ['spade', 'heart', 'diamond', 'club'],
        values = ['A', 2,3,4,5,6,7,8,9,10, 'J', 'Q', 'K'];
    //reset this.cards.
    this.cards = [];
    //Goes through suits
    for (var i = 0; i < suit.length; i++) {
        //Goes through values
        for (var j = 0; j < values.length; j++) {
            this.cards.push(new Card(suit[i], values[j]));
        }
    }
};
//Show method for Deck
Deck.prototype.show = function () {
    var show_cards = [];
    //Goes through each card
    for (var i = 0; i < this.cards.length; i++) {
        show_cards.push(this.cards[i].short);
    }
    //JSON.stringify turns output to string like fashion.
    console.log(JSON.stringify(show_cards));

    return this;
};
//Deck shuffle
Deck.prototype.shuffle = function () {
    for (var i = 0; i < this.cards.length; i++) {
        //placeholder for each card;
        var temp = this.cards[i],
        //random -> 0-1

            rand = Math.floor(Math.random()*this.cards.length);

        //Swap the two cards
        this.cards[i] = this.cards[rand];
        this.cards[rand] = temp;
    }

    return this;
};
//Deal a card from the deck
Deck.prototype.deal = function () {
    return this.cards.pop();
};
//Card constructor
function Card (suit, value) {
    this.suit  = suit;
    this.value = value;
    this.short = suit[0]+value;
}
//Player constructor
function Player (name) {
    this.name = name;
    this.hand = [];
}
Player.prototype.show = function () {
    console.log('Player:', this.name);
    console.log('Hand:', this.hand);

    return this;
};
//Draw method
Player.prototype.draw = function (deck) {
    //1 card out of the deck and
    //place it into the hand of the player
    this.hand.push(deck.deal());
    return this;
};
//Discard method
Player.prototype.discard = function (short) {
    if (short) {
        //discard the card with the short
        for (var i = 0; i < this.hand.length; i++) {
            if (this.hand[i].short == short) {
                //if it matches
                this.hand.splice(i, 1);
                return this;
            }
        }
    } else {
        //discard the last one
        this.hand.pop();
        return this;
    }
};

var deck = new Deck();
deck.reset();
deck.show().shuffle().show();
console.log(deck.deal());
deck.show();

var howard = new Player('Howard');
howard.draw(deck).draw(deck).draw(deck).draw(deck).draw(deck);
howard.show().discard().show().discard(howard.hand[1].short).show();

$(document).ready(function(){
    activeCards = [];
    currentCard = 0;

    function Card ($card) {
    	this.$card = $card;
    	this.$front = $card.find('.front');
    	this.$back = $card.find('.back');
    	this.deck = $card.data('.deck');

    	this.flipCard = function($card, $front, $back){
    	    $card.on('click', function(){
    		$front.toggleClass('is-hidden');
    		$back.toggleClass('is-hidden');
    	    });
    	};

    	this.flipCard(this.$card, this.$front, this.$back);
    };

    $('.card').each(function(){ new Card($(this)) });


    // Select additional decks
    $deckSelect = $('#deckSelector input');
    $deckSelect.on('change', function(){
	console.log('Selecting a new deck');
	deck = $(this).val();
	$deckCards = $('.card[data-deck='+ deck +']');
	$deckCards.toggleClass('active-card');
	
	addNewCards($('.active-card').length);
    });

    // Add new deck's cards
    function addNewCards(newCards) {
	// ONE MUST BE SELECTED
	console.log('Update active cards');
	activeCards = [];
	for(i=0; i<newCards; i++) {
	    activeCards.push(i);
	    shuffleCards();
	};
    }

    // Shuffle cards in active decks
    function shuffleCards() {
	console.log('shuffling active cards');
	var ac = activeCards;
	for(var j, x, i = ac.length; i; j = Math.floor(Math.random() * i), x = ac[--i], ac[i] = ac[j], ac[j] = x);
	activeCards = ac;
	currentCard = 0;
	nextCard();
    };

    // Move to next active card
    function nextCard() {
	console.log('move on to next card');
	$('.current-card').removeClass('current-card');

	if ( activeCards.length-1 > currentCard ) {
	    currentCard = currentCard + 1;
	} else {
	    currentCard = 0;
	}
	$($('.active-card')[currentCard]).addClass('current-card');	     
    };

    // Setup
    function setup() {
	$('#deckSelector input').first().click();
    };

    setup();

    $('.next-card').on('click', function() {
	nextCard();
    });

});

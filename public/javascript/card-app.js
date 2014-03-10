$(document).ready(function(){
    activeCards = [];
    currentCard = 0;

    // Flip to reverse card side
    function flipCard() {
    	$('.current-card').find('.front').toggleClass('is-hidden');
    	$('.current-card').find('.back').toggleClass('is-hidden');
    };

    // Select additional decks
    // TODO one must be selected
    // TODO make function, extract event
    $deckSelect = $('#deckSelector input');
    $deckSelect.on('change', function(){
	deck = $(this).val();
	$deckCards = $('.card[data-deck='+ deck +']');
	$deckCards.toggleClass('active-card');
	
	addNewCards($('.active-card').length);
    });

    // Add new deck's cards
    function addNewCards(newCards) {
	activeCards = [];
	for(i=0; i<newCards; i++) {
	    activeCards.push(i);
	    shuffleCards();
	};
    }

    // Shuffle cards in active decks
    function shuffleCards() {
	var ac = activeCards;
	for(var j, x, i = ac.length; i; j = Math.floor(Math.random() * i), x = ac[--i], ac[i] = ac[j], ac[j] = x);
	activeCards = ac;
	currentCard = 0;
	nextCard();
    };

    // Move to next active card
    function nextCard() {
	$('.current-card').removeClass('current-card');

	if ( activeCards.length-1 > currentCard ) {
	    currentCard = currentCard + 1;
	} else {
	    currentCard = 0;
	}
	$($('.active-card')[activeCards[currentCard]]).addClass('current-card');	     
    };

    // Reverse default card side
    function reverseSide() {
	$fronts = $('.card').find('.front');
	$backs = $('.card').find('.back');

    	$fronts.toggleClass('is-hidden');
    	$backs.toggleClass('is-hidden');
    }

    // Setup
    function setup() {
	$('#deckSelector input').first().click();

	$('#reverseCards').on('click', function() { reverseSide() });

	$('#nextCard').on('click', function() { nextCard() });

	$('.current-card').on('click', function() { flipCard() });

    };

    setup();

});

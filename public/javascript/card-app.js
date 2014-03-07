$(document).ready(function(){
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
	}

	this.flipCard(this.$card, this.$front, this.$back);
    }

    $('.card').each(function(){ new Card($(this)) });

    // Check first deck on page load
    currentDeck = $('.current-card').data('deck');
    $('.deck-selector input[value="'+ currentDeck  +'"]').prop('checked', true);

    // Choose any decks
    $('.deck-selector').on('change', function(){
	$newDecks = $('#current-decks')

	$newDecks.attr('class', '');
	$('.current-deck').removeClass('current-deck');
	$('[name="deck"]:checked').each(function(){
	    newDeck = $(this).attr('value');
	    $newCards = $('.card[data-deck="' + newDeck + '"]');
	    
	    $newCards.addClass('current-deck');
	    $('.current-card').removeClass('current-card');
	    $newDecks.addClass(newDeck);
	});
	$('.current-deck:first-of-type').addClass('current-deck');
    });

    // Go to the next card
    $('#header').on('click', function(){
	$currentCard = $('.current-card');
	$firstCard = $('#current-decks .current-deck').first();
	$nextCard = $('.current-deck.current-card').nextAll('.current-deck').first();

	if ( $nextCard.length ) {
	    $currentCard.removeClass('current-card');
	    $nextCard.addClass('current-card');
	} else {
	    $currentCard.removeClass('current-card');
	    $firstCard.addClass('current-card');
	}

    });

});

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

    $('.deck-selector').on('change', function(){
	newDeck = $(this).val();
	$('.current-deck').toggleClass('current-deck');
	$('.deck[data-deck='+ newDeck +']').toggleClass('current-deck');
    });

});

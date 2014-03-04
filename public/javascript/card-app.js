console.log('hi');

function Card (front, back, deck) {
    this.front = front;
    this.back = back;
    this.deck = deck;
}

$(document).ready(function(){
    function Card ($elm) {
	this.$elm = $elm;
	this.$front = $elm.find('front');
	this.$back = $elm.find('back');
	this.deck = $elm.data('deck');

	this.flipCard = function($elm, $front, $back){
	    $elm.on('click', function(){
		// These log but aren't doing anything?
		$front.addClass('is-hidden');
		$back.toggleClass('is-hidden');
	    });
	}

	this.flipCard(this.$elm, this.$front, this.$back);
    }

    $('.card').each(function(){
	$elm = $(this);
	new Card($elm);
    });
});

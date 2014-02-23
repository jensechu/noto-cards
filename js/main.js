$(document).ready(function(){

    play = true;

    function loadCards() {
        $.getJSON('js/cards.json', function(data) {
            var items = [];
            $.each( data.cards, function( i, val ) {
                items.push( 
                    "<div class='card is-hidden'><h1>" + data.cards[i].japanese + "</h1> <h1 class='english is-hidden'>" + data.cards[i].english + "</h1></div>" );
            });
            templateItems = items.join( "" )
            $(templateItems).appendTo( "#container" );
            
        })
	.done(function() { 	    
	    setInterval( function(){
		if( play ) { 
		    displayRandomCard()
		}
	    }, 300000);
	    showTranslation();
	    displayRandomCard();
	    pauseDisplay();
	    newCard();
	})
        return false;
    }

    function showTranslation() {
	$('.card').on('click', function(){
	    $(this).find('.english').toggleClass('is-hidden');
	});
    }

    function pauseDisplay() {
	$('.pause').on('click', function(){
	    play = !(play);
	    $(this).toggleClass('paused');
	});
    }

    function displayRandomCard(){
	cards = $('.card');
	english = $('.card .english');
	displayCard = Math.floor( Math.random() * cards.length )

	$(cards).addClass('is-hidden');
	$(english).addClass('is-hidden');
	$(cards[displayCard]).removeClass('is-hidden');
    }

    function newCard(){
	$('.toggle').on('click', function(){
	    displayRandomCard();
	});
    }

    loadCards();
});

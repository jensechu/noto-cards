$(document).ready(function(){

    play = true;
    currentDeck = 'sentence';
    TIME = 300000;

    function loadCards() {
	// Load in the cards
        $.getJSON('js/cards.json', function(data) {
            var items = [];
            $.each( data.cards, function( i, val ) {
                items.push( 
                    "<div class='card is-hidden " + data.cards[i].type  + "'><h1>" + data.cards[i].back + "</h1> <h1 class='reverse is-hidden'>" + data.cards[i].front + "</h1></div>" );
            });
            templateItems = items.join( "" )
            $(templateItems).appendTo( "#container" );
            
        })
	.done(function() { 	    
	    setInterval( function(){
		if( play ) { displayRandomCard() }
	    }, TIME);
	    displayRandomCard();
	    updateFaviconProgress();
	    $('.selected').on('click', function(){ 
		translate();
	    });

	})
        return false;
    }

    function translate() {
	// Displays the opposite side of a card
	$('.selected').find('.reverse').toggleClass('is-hidden');
    }

    function pauseDisplay() {
	// Pauses the 5min new card timer
	play = !(play);
	$('.pause').toggleClass('paused');
    }

    $('.pause').on('click', function(){
	pauseDisplay();
    });

    function displayRandomCard(){
	// Hide all cards
	$('.card').removeClass('selected');
	$('.card').addClass('is-hidden');
	$('.reverse').addClass('is-hidden');

	// Display a random card in the current deck
	cards = $('.' + currentDeck + '');
	displayCard = Math.floor( Math.random() * cards.length )
	$(cards[displayCard]).addClass('selected');
	$(cards[displayCard]).removeClass('is-hidden');

	// Turn on the favicon notification
	Piecon.setProgress(100);
    }

    $('.toggle').on('click', function(){
	displayRandomCard();
    });

    function selectDeck(){
	// Choose deck of cards from dropdown
	currentDeck = $('#cardSelection').val();
	$('#cardSelection').toggleClass('kana-padding');
	displayRandomCard();
    }

    $('#cardSelection').on('change', function(){
	selectDeck();
    });

    function updateFaviconProgress(){
	// Turn off the favicon notification
	window.onblur = function() {
	    Piecon.setProgress(0);
	}
	window.onfocus = function() {
	    Piecon.setProgress(0);
	}
    }
    
    document.onkeypress = function hotKeys(e){
	var code = e.keyCode || e.which;

	if (code == 119) {
	    // Keyboard shortcuts for 'w'
	    displayRandomCard();
	}
	else if (code == 115) {
	    // Keyboard shortcuts for 's'
	    translate();
	}
    }

    // Options for notification display
    Piecon.setOptions({
	color: '#F18ACC',
	background: '#FCDCF2',
	shadow: '#fff'
    });

    loadCards();
});

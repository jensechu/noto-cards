$(document).ready(function(){
    function loadCards() {
        $.getJSON('/js/cards.js', function(data) {
            var items = [];
            $.each( data.cards, function( i, val ) {
                console.log(i);
                items.push( 
                    "<div class='card' + <h1 class='japanese' data-pronounciation='" + data.cards[i].pronounciation + "'>" + data.cards[i].japanese + "</h1> <h1 class='english'>" + data.cards[i].english + "</h1></div>" );
            });
            
            templateItems = items.join( "" )

            $(templateItems).appendTo( "#container" );
            
        })
            .error(function(j, t, e) { console.log(e);})
        return false;
    }

    loadCards();
    console.log(window.cards);
});

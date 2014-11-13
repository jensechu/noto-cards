window.Noto = {

  CARD_TEMPLATE:  $("#cardTemplate").html().trim(),
  $cardContainer: $("#container"),

  _loadCards: function() {
    $.getJSON('js/cards.json', function(data) {
      Noto._appendCards(data.cards);
    }).done(function(){
      Noto.handleSelectRandomCard();
      Noto.handleFlipCard();
    });

    return false;
  },

  _buildCard: function(card) {
    $currentCard = Noto.$cardContainer.find('.card').last();
    $front       = $currentCard.find('.front');
    $back        = $currentCard.find('.back');

    $front.text(card.front);
    $back.text(card.back);
  },

  _appendCards: function(cards) {
    $.each(cards, function() {
      var card = this;

      Noto.$cardContainer.append(Noto.CARD_TEMPLATE);
      Noto._buildCard(card);
    });

  },

  handleFlipCard: function() {
    $('.card').on('click', function() {
      Noto._flipCard();
    });
  },

  _flipCard: function() {
    var $sides = $('.selected').find('.side');

    $sides.toggleClass('active');
  },

  handleSelectRandomCard: function() {
    $('.toggle').on('click', function() {
      Noto._resetCard();
      Noto._selectRandomCard();
    });
  },

  _resetCard: function() {
    var $selectedCard = $('.selected');
    var $sides = $selectedCard.find('.side');

    $sides.removeClass('active');
    $selectedCard.find('.front').addClass('active');
  },

  _selectRandomCard: function() {
    var $activeCards = Noto.$cardContainer.find('.card');
    var randomNumber = Math.floor( Math.random() * $activeCards.length);
    var $selectedCard = $($activeCards[randomNumber]);

    $('.selected').removeClass('selected');

    $selectedCard.addClass('selected');
  }
};

window.Noto._loadCards();

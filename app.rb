require 'sinatra'
require 'sinatra/activerecord'
require './environments'

class Deck < ActiveRecord::Base
  has_many :cards, dependent: :destroy
end

class Cards < ActiveRecord::Base
end

get "/" do
  numDecks = Deck.all.length
  allDecks = Deck.take(numDecks)

  numCards = Cards.all.length
  allCards = Cards.take(numCards)

  @decks_list = Hash.new()

  allDecks.each_with_index do |deck|
    cards = Array.new
    allCards.each do |card|
      if card.decks_id == deck.id
        cards.push(card)
      end
    end
    @decks_list[deck] = cards
  end

  erb :"decks/index"
end

get "/new" do
  numDecks = Deck.all.length
  @decks = Deck.take(numDecks)

  @card = Cards.new
  erb :"decks/new"
end

post "/new" do
  numDecks = Deck.all.length
  @decks = Deck.take(numDecks)

  @card = Cards.new(params[:cards])
  @card.save

  @newCard = Cards.last
  erb :"decks/new"
end

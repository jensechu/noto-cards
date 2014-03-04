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
  @decks = Deck.take(numDecks)

  numCards = Cards.all.length
  @cards = Cards.take(numCards)

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

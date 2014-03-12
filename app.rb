require 'sinatra'
require 'sinatra/activerecord'
require 'sinatra/content_for'
require './environments'

class Category < ActiveRecord::Base
  has_many :decks, dependent: :destroy
end

class Deck < ActiveRecord::Base
  has_many :cards, dependent: :destroy
end

class Cards < ActiveRecord::Base
end

get "/" do
  numCategories = Category.all.length
  @categories = Category.take(numCategories)

  numDecks = Deck.all.length
  @decks = Deck.take(numDecks)

  numCards = Cards.all.length
  @cards = Cards.take(numCards)

  erb :"decks/index"
end

get "/new" do
  numDecks = Deck.all.length
  @decks = Deck.take(numDecks)

  @card = Cards.newtus

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

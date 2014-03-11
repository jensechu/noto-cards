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
  allCategories = Category.take(numCategories)

  numDecks = Deck.all.length
  allDecks = Deck.take(numDecks)

  numCards = Cards.all.length
  allCards = Cards.take(numCards)

  @categories_list = Hash.new()

  allCategories.each_with_index do |category|
    allDecks.each_with_index do |deck|
      decks = Hash.new()
      cards = Array.new
      allCards.each do |card|
        if card.decks_id == deck.id
          cards.push(card)
        end
      end
      decks[deck.name] = cards.shuffle
      @categories_list[category] = decks
    end
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

class CreateDecks < ActiveRecord::Migration
  def self.up
    create_table :decks do |t|
      t.string :name
      t.timestamps
    end

    create_table :cards do |t|
      t.string :front
      t.string :back
      t.belongs_to :decks
      t.timestamps
    end
  end
end

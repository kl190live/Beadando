import React, { useState } from 'react';
import {NewCategoryItem, CategoryDropdown, CategoryInterface} from "./newCategoryItem";

class Item {
  constructor(public readonly item: string, public readonly category: string) {}
}

function App() {
  const initialItems = [
    new Item("Banan", "kategória1"),
    new Item("Alma", "kategória2"),
    new Item("korte", "kategória3")
  ];

  const [items, setItems] = useState<Item[]>(initialItems);
  const [filteredItems, setFilteredItems] = useState<Item[]>(initialItems);
  const [isAddingNewItem, setIsAddingNewItem] = useState(false);
  const [newItemValue, setNewItemValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const uniqueCategories: CategoryInterface[] = items.map(items => ({ category: items.category }));

  const filterBySearchTerm = (term: string) => {
    const filtered = items.filter(item =>
        item.item.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleRemove = (itemToRemove: Item) => {
    const updatedItems = items.filter(item => item !== itemToRemove);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    const filtered = items.filter(item => item.category === category);
    setFilteredItems(filtered);
  };

  const handleSubmitNewItem = () => {
    if (newItemValue.trim() === '' || selectedCategory === '') {
      return; // Prevent adding empty item or without category
    }
    const newItem = new Item(newItemValue, selectedCategory);
    setItems([...items, newItem]);
    setFilteredItems([...items, newItem]);
    setIsAddingNewItem(false);
    setNewItemValue('');
    setSelectedCategory('');
  };

  return (
      <div className="app-container">
        <header>
          <h1>Items List</h1>
        </header>
        <main>
          {isAddingNewItem ? (
              <div className="form-container">
                <label>Tétel:</label>
                <input
                    type="text"
                    value={newItemValue}
                    onChange={(e) => setNewItemValue(e.target.value)}
                />
                <label>Kategória:</label>
                <CategoryDropdown categories={uniqueCategories} />
                <button onClick={handleSubmitNewItem}>Mentés</button>
              </div>
          ) : (
              <>
                <div className="buttons-container">
                  <CategoryDropdown categories={uniqueCategories} />
                  <button onClick={() => setFilteredItems(items)}>Visszaállítás</button>
                  <button onClick={() => setIsAddingNewItem(true)}>Új</button>
                </div>
                <input
                    type="text"
                    placeholder="Kereső"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      filterBySearchTerm(e.target.value);
                    }}
                />
                <div className="items-container">
                  {filteredItems.map((item, i) => (
                      <NewCategoryItem
                          item={item.item}
                          key={i}
                          category={item.category}
                          onRemove={() => handleRemove(item)}
                      />
                  ))}
                </div>
              </>
          )}
        </main>
      </div>
  );
}

export default App;

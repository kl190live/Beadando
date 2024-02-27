import React, { useState } from 'react';
import { NewCategoryItem, CategoryDropdown, ItemInterface, CategoryInterface } from "./newCategoryItem";

class Item {
  constructor(public readonly item: string, public readonly category: string) {}
}

function App() {

  const [item, setItem] = useState<Item[]>([
    new Item("Banan", "kategória1"),
    new Item("Alma",  "kategória2"),
    new Item("korte", "kategória3")
  ]);
  const [filtered, setFiltered] = useState<Item[]>(item);
  const [page, setPage] = useState(false);
  const [itemValue, setItemValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const uniqueCategories: CategoryInterface[] = item.map(item => ({ category: item.category }));


  function filterBySearchTerm(term: string) {
    const filteredItems = item.filter(item =>
        item.item.toLowerCase().includes(term.toLowerCase()));
    setFiltered(filteredItems);
  }

  function handleRemove(itemToDelete: Item) {
    const updatedItems = item.filter(it => it !== itemToDelete)
    setItem(updatedItems)
    const updatedFilter = filtered.filter(it => it !== itemToDelete)
    setFiltered(updatedFilter)
  }

  function filterByCategory(category: string) {
    setSelectedCategory(category);
    const filteredItems = item.filter(item => item.category === category)
    setFiltered(filteredItems)
  }

  function handleSubmitNewItem() {
    const newItem = new Item(itemValue, selectedCategory);
      setItem([...item, newItem]);
      setFiltered([...item, newItem]);
      setPage(false);
      setItemValue('');
      setSelectedCategory('');
  }

  return (
      <div className="app-container">
        <header>
          <h1 className={"H1"}>Items List</h1>
        </header>
        <main>
          {page ? (
              <div className="form-container">
                <label>Tétel:</label>
                <input type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} />
                <label>Kategória:</label>
                <CategoryDropdown categories={uniqueCategories} />
                <button onClick={() => handleSubmitNewItem()}>Mentés</button>
              </div>
          ) : (
              <>
                <div className="buttons-container">
                  <CategoryDropdown categories={uniqueCategories} />
                  <button className={"gombok"} onClick={() => setFiltered(item)}>Visszaállítás</button>
                  <button className={"gombok"} onClick={() => setPage(true)}>Új</button>
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
                  {filtered.map((item, i) => (
                      <NewCategoryItem item={item.item} key={i} category={item.category} onRemove={() => handleRemove(item)} />
                  ))}
                </div>
              </>
          )}
        </main>
      </div>
  );
}

export default App;

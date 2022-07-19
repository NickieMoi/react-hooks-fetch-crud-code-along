import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/items")
    .then(res => res.json())
    .then(res => setItems(res))
  }, [])
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleUpd
  function handleUpdateItem(upDatedItem){
    const upDatedItems = items.map( item => {
      if(item.id === upDatedItem.id){
        return upDatedItem
      } else {
        return item
      }
    })
    setItems(upDatedItems)
  }

  function handleDeleteItem(deletdedItem){
    const upDatedItems = items.filter((item) => item.id !== deletdedItem.id)
    setItems(upDatedItems)
  }


  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm />
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <><Item key={item.id} item={item} /><Item key={item.id} item={item} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} /></>
        ))}
      </ul>
    </div>
  );
}
export default ShoppingList;

import React from "react";

function Item({ item }) {
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleDeleteClick() {
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item));
  }

  function handleAddToCartClick() {
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"}>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove">Delete</button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
export default Item; 
 5  
src/components/ItemForm.js
@@ -1,22 +1,23 @@
import React, { useState } from "react";
function ItemForm({ onAddItem}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");
  function handleSubmit(e){
    e.preventDefault()
    const itemData = {
      name : name,
      category : category,
      isInCart : false,
    }

    fetch("http://localhost:4000/items", {
    fetch("http://localhost:3000/items", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
        "Content-Type" : "application/json",
        Accept : "application/json"
      },
      body : JSON.stringify(itemData)
    })
    .then(res => res.json())
    .then( res => onAddItem(res))
  }
  return (
    <form className="NewItem" onSubmit={ handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>
      <button type="submit">Add to List</button>
    </form>
  );
}
export default ItemForm;
}
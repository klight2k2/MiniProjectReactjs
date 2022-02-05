import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategories =['all',...new Set(items.map(item =>
  item.category))]

function App() {
  const [menuItems,setMenuItems] =useState(items);
  function handleFilter(category){
    console.log("handleFilter")
    if(category==='all') setMenuItems(items);
    else{
      const newMenuItems = items.filter(item=>item.category===category);
      setMenuItems(newMenuItems);
    }
  }
  return <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={allCategories} handleFilter={handleFilter}/>
        <Menu items={menuItems}/>
      </section>
  </main>;
}

export default App;

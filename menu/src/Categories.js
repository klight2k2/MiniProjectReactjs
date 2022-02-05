import React from 'react';

const Categories = ({categories,handleFilter}) =>{

  return <div className="btn-container">
    {categories.map((category,index)=>(
      <button className="filter-btn"
      onClick={()=>handleFilter(category)}
      key={index}
      >{category}</button>
    ))}
  </div>;
};

export default Categories;

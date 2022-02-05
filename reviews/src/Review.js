import React, { useState } from 'react';
import people from './data';
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Review = () => {
  const [index, setIndex]=useState(0);
  const {name,job,image,text}=people[index];
  
  const checkValid=(newIndex)=>{
    if(newIndex===index) newIndex++;
    if(newIndex>people.length - 1) return 0;
    if(newIndex<0) return people.length - 1;
    return newIndex;
  }
  const handleNextPerson=()=>{
    setIndex(checkValid(index+1));
  }
  const handlePrevPerson=()=>{
    setIndex(checkValid(index-1));
  }
  const handleRandomPerson=()=>{
    setIndex(checkValid(Math.floor(Math.random()*people.length)));
  }
  return (
   <article className="review">
     <div class="img-container">
     <img src={image} alt={name} className="person-img"/>
    <span className="quote-icon">
      <FaQuoteRight/>
    </span>
     </div>
     <h4 className="author">{name}</h4>
     <p className="job">{job}</p>
     <p className="info">{text}</p>
    <div className="btn-container">
    <button className="prev-btn" onClick={handlePrevPerson}>
      <FaChevronLeft/>
    </button>
    <button className="next-btn" onClick={handleNextPerson}>
      <FaChevronRight/>
    </button>
    </div>
    <button className="random-btn" onClick={handleRandomPerson}>
      Suprise me
    </button>
   </article>
  )
};

export default Review;

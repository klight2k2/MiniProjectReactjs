import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading,setLoading]=useState(false);
  const [tours,setTours] = useState([])

  const fetchTours=async ()=>{
    setLoading(true);
     try{
       const response= await fetch(url);
       const tours=await response.json();
       setLoading(false);
       setTours(tours);
     }catch(e){
       console.error(e)
     }
  }

  const deleteTour=(id)=>{
    const newTours=tours.filter(tour=>tour.id!==id);
    setTours(newTours);
  }
  useEffect(() => {
    fetchTours();
  },[]);
  if(loading) return (
    <main>
      <Loading />
    </main>
  )

  if(tours.length===0) return(
    <main>
      <h2> No tours left</h2>
      <button onClick={fetchTours} className="btn">Refresh</button>
    </main>
  )

  return (
    <main>
      <Tours tours={tours} deleteTour={deleteTour}/>
    </main>
    )
}

export default App

import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'


function App() {
  const [loading, setLoading]=useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue]= useState(0)
  
  const fetchJobs=async ()=>{
    const response = await fetch(url)
    const jobs =await response.json()
    setJobs(jobs)
    setLoading(false)
  }
  useEffect(() => {
    fetchJobs()
  },[])

  if(loading) {
    return <main className="section loading">
      <h1>Loanding...</h1>
    </main>
  }
  const {title,dates,duties,company}=jobs[value];
  return <section className="section">
            <div className="title">
              <h2 >experience</h2>
              <div className="underline"></div>
            </div>
            <div className="jobs-center">
              <div className="btn-container">
                  {jobs.map((job,index)=>{
                    return (
                      <button 
                      className={`job-btn ${value===index && 'active-btn'}`} 
                      key={jobs.id}
                      onClick={() =>setValue(index)}
                      >{job.company}</button>
                    )
                  })}
              </div>
                <article className="job-info">
                    <h3>{title}</h3>
                    <h4>{company}</h4>
                    <p className="job-date">{dates}</p>
                    {duties.map((duty,index)=>{
                        return (
                          <div className="job-desc" key={index}>
                            <FaAngleDoubleRight
                            className='job-icon'/>
                            <p>{duty}</p>
                          </div>
                        )
                    })}
                </article>
            </div>
         </section>
}

export default App

import React from 'react'
// import Button from '@mui/material/Button';
import './display.css'
export default function DisplayPage(props) {
  return (
    <>

      <section className="display-container">
        <div className="heading-display">
          <h1>{props.title}</h1>
          <p>{props.descprition}</p>
        </div>
        <div className="display">
          <button className='display-btn' >{props.add}</button>
          <button className='display-btn' >{props.list}</button> 
        </div>
      </section>
    </>
  )
}

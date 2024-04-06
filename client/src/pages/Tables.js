import React from 'react';
import '../styles/table.css';
import titlepic from '../assets/food4.jpg';
import tablepic1 from '../assets/table1.jpg';
import Card from "../Card";
function Tables() {
  return (
    <div>
      <main>
        <div className='title'>
        <div className='bgpic'>
          <img src={titlepic} alt='img'></img>
        </div>
        </div>
        <section id='cards'>
        <div className='heading-txt'>
            <h1>Tables</h1>
        </div>
        <div className='cards'>
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />

      
      <Card 
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
    </div>
    </section>
      </main>
    </div>
  )
}

export default Tables

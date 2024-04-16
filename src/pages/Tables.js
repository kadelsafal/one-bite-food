import '../styles/table.css';
import titlepic from '../assets/food4.jpg';
import tablepic1 from '../assets/table1.jpg';
import tablepic2 from '../assets/table2.jpg';
import tablepic3 from '../assets/table3.jpg';
import tablepic4 from '../assets/table4.jpg';
import tablepic5 from '../assets/table 5.jpg';
import tablepic6 from '../assets/table6.jpg';
import tablepic7 from '../assets/table7.jpg';
import tablepic8 from '../assets/table8.jpg';

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
      layout="default"
        image ={tablepic1}
        title = "Table 1"
        description = "No. of People • 2"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic2}
        title = "Table 2"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic3}
        title = "Table 3"
        description = "No. of People • 1"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic4}
        title = "Table 4"
        description = "No. of People • 5"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic5}
        title = "Table 5"
        description = "No. of People • 3"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic6}
        title = "Table 6"
        description = "No. of People • 6"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />
      <Card 
      layout="default"
        image ={tablepic7}
        title = "Table 7"
        description = "No. of People • 4"
        button = "Book a table"
        booked='• Booked'
        time1='• 10 AM - 12 PM'
      />

      
      <Card 
      layout="default"
        image ={tablepic8}
        title = "Table 8"
        description = "No. of People • 2"
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

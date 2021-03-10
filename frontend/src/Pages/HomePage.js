import React from 'react'
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function HomePage({children}) {
    return (
      <div>
        <header className="mb-2"><Header /></header>       
                
        <main>{children}</main>         
{/*             
        <footer>
         <Footer />  
        </footer> */}
       
      </div>
    );
}

export default HomePage;
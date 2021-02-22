import React from 'react'
import Footer from '../Components/Footer';
import Header from '../Components/Header';

function HomePage({children}) {
    return (
      <div>
        <Header />
                
        <main>{children}</main>         
            
        <footer>
         <Footer />  
        </footer>
       
      </div>
    );
}

export default HomePage;
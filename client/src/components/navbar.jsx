import React from 'react';
import { Link } from 'react-router-dom' ;


function NavLinks({ currentPage, handlePageChange }) {
    return (
    
    <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/">
            <img src="client/build/static/media/logo.1b58719cd0fcb571ba02.png"></img>
       </Link>
        
      <ul className="nav nav-links">
        <li className="nav-item">
          <Link
            to="/home"
            onClick={() => handlePageChange('Home')}


            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/inventory"
            onClick={() => handlePageChange('Inventory')}

            className={currentPage === 'Inventory' ? 'nav-link active' : 'nav-link'}
          >
            Inventory
          </Link>
          </li>
        <li className="nav-item">
          <Link
            to="/orders"
            onClick={() => handlePageChange('Orders')}
            
            className={currentPage === 'Orders' ? 'nav-link active' : 'nav-link'}
          >
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/saleschart"
            onClick={() => handlePageChange('Sales Chart')}
           
            className={currentPage === 'Sales Chart' ? 'nav-link active' : 'nav-link'}
          >
            Sales Chart
          </Link>
        </li>
      </ul>
      </nav>
    );
  }

  export default NavLinks;